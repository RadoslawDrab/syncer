import { NextFunction, Request, Response } from 'express'

import { setError } from 'utils'
import { auth, getData } from 'config/firebase'

type Path = 'songs' | 'users' | 'playlists'

/** Checks whether current user's id is the same as creator's id */
export async function checkCreator<T extends { userId: string }>(req: Request, res: Response, next: NextFunction): Promise<void> {
	if (req.headers['dev-mode']) return next()
	try {
		const type: Path = this

		const snapshot = await getData(`${type}/${req.params.id}`)
		if (!snapshot.exists()) {
			setError(res, {
				code: 400,
				message: 'Invalid identifier'
			})
			return
		}
		const currentUser = auth.currentUser

		// Check user's id and creator's id
		const val: T = snapshot.val()
		if (val.userId !== currentUser?.uid) {
			setError(res, {
				code: 403,
				message: 'Current user is not the creator'
			})
			return
		}
	} catch (error) {
		setError(res, {
			code: error.code || 500,
			message: error.message || 'Internal server error'
		})
	}
	next()
}
export type CheckCreatorHandler = typeof checkCreator

export async function checkUser(req: Request, res: Response, next: NextFunction) {
	if (req.headers['dev-mode']) return next()

	// Check user's auth

	const currentUser = auth.currentUser

	// Checks if user is logged in
	if (!currentUser) {
		setError(res, {
			code: 401,
			message: 'Unauthorized user'
		})
		return
	}

	// Checks if user is verified
	if (!currentUser.emailVerified) {
		setError(res, {
			code: 403,
			message: 'User email not verified'
		})
		return
	}

	// Checks if user is found in database
	const userSnapshot = await getData(`users/${currentUser.uid}`)
	if (!userSnapshot.exists()) {
		setError(res, {
			code: 400,
			message: 'Invalid user identifier'
		})
		return
	}

	next()
}

export function checkId(req: Request, res: Response, next: NextFunction) {
	if (!req.params.id) {
		setError(res, {
			code: 400,
			message: 'No identifier'
		})
		return
	}
	next()
}
export function checkBody(req: Request, res: Response, next: NextFunction) {
	if (!req.body) {
		return setError(res, { code: 400, message: 'No body' })
	}
	next()
}

type Keys<T> = (keyof T | string)[]
export interface KeysType<T> {
	mandatory: Keys<T>
	optional?: Keys<T>
}

export function containsType<T>(req: Request, res: Response, next: NextFunction) {
	const { mandatory }: KeysType<T> = this

	let unknownProperty: any = ''

	mandatory.forEach((key) => {
		if (req.body[key] === undefined) {
			unknownProperty = key
		}
	})

	if (unknownProperty) {
		setError(res, {
			code: 400,
			message: `Invalid body. Unknown property: "${unknownProperty}". Body must contain "${mandatory.join(', ')}"`
		})
		return
	}
	containsOnlyType.call(this, req, res, next)
}
export function containsPartialType<T>(req: Request, res: Response, next: NextFunction) {
	const { mandatory, optional }: KeysType<T> = this

	let hasKey = false
	mandatory.forEach((key) => {
		if (req.body[key]) hasKey = true
	})
	optional?.forEach((key) => {
		if (req.body[key]) hasKey = true
	})
	if (!hasKey) {
		return setError(res, {
			code: 400,
			message: `Invalid body. Body must contain any of the keys "${mandatory.join(', ')}, ${optional?.join(', ')}"`
		})
	}

	containsOnlyType.call(this, req, res, next)
}
export function containsOnlyType<T>(req: Request, res: Response, next: NextFunction) {
	const { mandatory, optional }: KeysType<T> = this
	let unknownBodyProperties: string[] = Object.keys(req.body)

	test(mandatory)
	if (optional) test(optional)

	if (unknownBodyProperties.length > 0) {
		const props = unknownBodyProperties.join(', ')
		return setError(res, {
			code: 400,
			message: `Unknown body properties: ${props}`
		})
	}

	next()

	function test<T>(array: Keys<T>) {
		unknownBodyProperties = unknownBodyProperties.filter((prop) => array.findIndex((key) => key === prop) === -1)
	}
}