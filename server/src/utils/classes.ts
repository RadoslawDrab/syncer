import { NextFunction, Request, Response } from 'express'

import { setError, setStatus } from '.'

import { getData, setData } from 'config/firebase'
import { compareArrays, filterObject, findObject, flattenObject, objectToArray } from 'shared/utils'
import { ObjectKeys } from 'shared/types/global'

export class Endpoint<Type extends { id: string }> {
	name: string

	private _path: string
	private _returnAsArray: boolean

	constructor(path: string, name: string, returnAsArray: boolean = true) {
		this._path = path
		this._returnAsArray = returnAsArray
		this.name = name[0]?.toUpperCase() + name.slice(1)
		this.getAll = this.getAll.bind(this)
		this.getSingle = this.getSingle.bind(this)
		this.add = this.add.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async getAll<T extends object = Type>(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const data = await this._readData<ObjectKeys<T>>()
			const queries = req.query
			const filtered = filterObject(data, (value) => {
				const props = flattenObject(value)
				// Searches for query keys present in object
				const keys = Object.keys(queries).filter(
					(queryKey: keyof typeof queries) => !!Object.keys(props).find((propsKey: keyof typeof props) => propsKey === queryKey)
				)

				// Checks if all keys match
				return !keys
					.reduce((acc, key: keyof typeof props) => {
						const prop = props[key],
							query = queries[key]

						// Checks if `prop` and `query` variables are arrays. If so compares if all of items in them are the same. Order doesn't matter
						if (Array.isArray(prop) && Array.isArray(query)) {
							return [...acc, compareArrays(query, prop)]
						}

						return [
							...acc,
							// Checks if current object contains any key with same value as query
							String(prop).toLowerCase().includes(String(query).toLowerCase())
						]
					}, [])
					.some((value) => !value)
			})

			setStatus(
				res,
				{
					code: 200,
					message: `${this.name}s retrieved`
				},
				await this._getAllCallback(this._returnAsArray ? objectToArray(filtered) : filtered, req)
			)
			return
		} catch (error) {
			setError(res, { code: error.code ?? 500, message: error.message || 'Internal server error' })
		}
		next()
	}
	async getSingle<T extends { id: string } = Type>(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const data = await this._readData<ObjectKeys<T>>()
			const singleData = findObject(data, (value) => value.id === req.params.id)
			if (!singleData) {
				setError(res, {
					code: 400,
					message: 'Invalid identifier'
				})
				return
			}
			setStatus(res, { code: 200, message: `${this.name} retrieved` }, await this._getCallback(singleData, req))
		} catch (error) {
			setError(res, { code: error.code ?? 500, message: error.message })
		}
		return
	}
	async add<Unmodified extends { id: string } = Type, Modified extends { id: string } = Unmodified>(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const bodyData: Unmodified = req.body

		const modifiedData = await this._addCallback<Unmodified, Modified>(bodyData, req)
		try {
			const data = await this._readData<ObjectKeys<typeof modifiedData>>()
			await this._writeData({ ...data, [modifiedData.id]: modifiedData })

			setStatus(
				res,
				{
					code: 201,
					message: `${this.name} added`
				},
				null
			)
		} catch (error) {
			setError(res, { code: error.code ?? 500, message: error.message || 'Internal server error' })
		}
		return
	}
	async update<T extends { id: string } = Type>(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const data = await this._readData<ObjectKeys<T>>()
			const foundData = findObject(data, (value) => value.id === req.params.id)

			if (foundData === null) {
				setError(res, {
					code: 400,
					message: 'Invalid identifier'
				})
				return
			}
			const body = await this._updateBodyCallback(foundData, req.body, req)
			const singleData = this._updateCallback({ ...foundData, ...body }, req)

			this._writeData.call(this, { ...data, [foundData.id]: singleData })

			setStatus(
				res,
				{
					code: 200,
					message: `${this.name} updated`
				},
				null
			)
		} catch (error) {
			setError(res, { code: error.code ?? 500, message: error.message || 'Internal server error' })
		}
		return
	}
	async delete<T extends { id: string } = Type>(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const data = await this._readData<ObjectKeys<T>>()
			const dataId = req.params.id
			await this._deleteCallback(data, req)
			if (!dataId) {
				setError(res, {
					code: 400,
					message: "Request doesn't contain id parameter"
				})
				return
			}
			const filteredData = filterObject(data, (key) => key.id !== dataId)

			await this._writeData(filteredData)

			setStatus(
				res,
				{
					code: 200,
					message: `${this.name} deleted`
				},
				null
			)
		} catch (error) {
			setError(res, { code: error.code ?? 500, message: error.message || 'Internal server error' })
		}
		return
	}

	setGetCallback<Unmodified extends object = Type, Modified extends object = Unmodified>(
		callback: (data: Unmodified, req: Request) => Promise<Modified>
	) {
		this._getCallback<Unmodified, Modified> = callback
	}
	setGetAllCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		callback: (data: Unmodified, req: Request) => Promise<Modified>
	) {
		this._getAllCallback<Unmodified, Modified> = callback
	}
	setAddCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		callback: (data: Unmodified, req: Request) => Promise<Modified>
	) {
		this._addCallback<Unmodified, Modified> = callback
	}
	setUpdateCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		callback: (data: Unmodified, req: Request) => Promise<Modified>
	) {
		this._updateCallback<Unmodified, Modified> = callback
	}
	setUpdateBodyCallback<
		Unmodified extends object = ObjectKeys<Type>,
		Modified extends object = Unmodified,
		Body extends object = Partial<Type>
	>(callback: (data: Unmodified, body: Body, req: Request) => Promise<Modified>) {
		this._updateBodyCallback<Unmodified, Modified, Body> = callback
	}
	setDeleteCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		callback: (data: Unmodified, req: Request) => Promise<Modified>
	) {
		this._deleteCallback<Unmodified, Modified> = callback
	}

	private async _getCallback<Unmodified extends object = Type, Modified extends object = Unmodified>(
		data: Unmodified,
		req: Request
	): Promise<Modified | Unmodified> {
		return data
	}
	private async _getAllCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		data: Unmodified,
		req: Request
	): Promise<Modified | Unmodified> {
		return data
	}
	private async _addCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		data: Unmodified,
		req: Request
	): Promise<Modified | Unmodified> {
		return data
	}
	private async _updateCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		data: Unmodified,
		req: Request
	): Promise<Modified | Unmodified> {
		return data
	}
	private async _deleteCallback<Unmodified extends object = ObjectKeys<Type>, Modified extends object = Unmodified>(
		data: Unmodified,
		req: Request
	): Promise<Modified | Unmodified> {
		return data
	}
	private async _updateBodyCallback<
		Unmodified extends object = ObjectKeys<Type>,
		Modified extends object = Unmodified,
		Body extends object = Type
	>(data: Unmodified, body: Body, req: Request): Promise<Modified | Unmodified> {
		return data
	}
	private async _readData<T extends object>(): Promise<T> {
		// Read data
		return (await getData(this._path)).val()
	}
	private async _writeData<T extends object>(data: T): Promise<void> {
		// Write data
		return setData(this._path, data)
	}
}
