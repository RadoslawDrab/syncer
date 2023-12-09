import { NextFunction, Request, Response } from 'express'
import { getAuth } from 'firebase/auth'

import { setError } from 'utils'
import app, { getData } from 'config/firebase'

const auth = getAuth(app)

/** Checks whether current user's id is the same as creator's id */
export function checkSong(req: Request, res: Response, next: NextFunction) {
	// Check user's id and creator's id

	next()
}

export async function checkUser(req: Request, res: Response, next: NextFunction) {
	const devMode = Boolean(req.headers['dev-mode'])
	if (devMode) return next()
	
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

	let isValid = true

	mandatory.forEach((key) => {
		if (req.body[key] === undefined) {
			isValid = false
		}
	})

	if (!isValid) {
		setError(res, {
			code: 400,
			message: `Invalid body. Body must contain "${mandatory.join(', ')}"`
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