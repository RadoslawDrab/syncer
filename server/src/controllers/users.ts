import { getAuth, signOut } from 'firebase/auth'
import { Response, Request } from 'express'

import { getUser as getFirebaseUser, getJwtToken } from 'auth/index'
import app from 'auth/admin'
import { setError, setStatus } from 'utils'
import { Endpoint } from 'utils/classes'

import { FullUser as DBFullUser } from 'shared/types/database'

const auth = getAuth()

const endpoint = new Endpoint<DBFullUser>('users/', 'User')

endpoint.setUpdateBodyCallback(async (data, body, req) => {
	if (!req.headers['dev-mode']) {
		const user = auth.currentUser
		if (user) auth.updateCurrentUser({ ...user, ...req.body })
	}
	return body
})
endpoint.setGetCallback(async (data) => {
	const user = await app.auth().getUser(data.id)

	return {
		...data,
		displayName: user.displayName,
		photoURL: user.photoURL,
		emailVerified: user.emailVerified,
		metadata: user.metadata
	}
})
endpoint.setDeleteCallback(async (data, req) => {
	if (!req.headers['dev-mode']) {
		const user = auth.currentUser
		await user?.delete()
	}
	return data
})

export const getUsers = endpoint.getAll
export const getUser = endpoint.getSingle
export const updateUser = endpoint.update
export const deleteUser = endpoint.delete

export async function signInUser(req: Request, res: Response) {
	const token = req.headers.token
	const isIdToken = req.headers['is-id-token'] === 'true'

	if (typeof token !== 'string') {
		setError(res, {
			code: 400,
			message: 'No token value'
		})
		return
	}

	try {
		const jwtToken = isIdToken ? await getJwtToken(token) : token
		const user = await getFirebaseUser(jwtToken)
		setStatus(
			res,
			{
				code: 200,
				message: 'User signed in'
			},
			{ user, token: jwtToken }
		)
	} catch (error) {
		setError(res, {
			code: error.code || 400,
			message: error.message || 'Bad request'
		})
	}
}
export async function signOutUser(req: Request, res: Response) {
	try {
		await signOut(auth)
		setStatus(
			res,
			{
				code: 200,
				message: 'User signed out'
			},
			null
		)
	} catch (error) {
		setError(res, {
			code: 500,
			message: error.message || 'Internal server error'
		})
	}
}
