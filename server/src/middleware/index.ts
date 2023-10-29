import { NextFunction, Request, Response } from 'express'
import { getAuth } from 'firebase/auth'

import { setError } from 'src/utils'
import app, { getData } from 'src/config/firebase'

const auth = getAuth(app)

/** Checks whether current user's id is the same as creator's id */
export function checkSong(req: Request, res: Response, next: NextFunction) {
	// Check user's id and creator's id

	next()
}

export async function checkUser(req: Request, res: Response, next: NextFunction) {
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
