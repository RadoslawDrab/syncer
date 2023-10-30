import { User, getAuth, signOut, updateCurrentUser } from 'firebase/auth'
import { Response, Request } from 'express'

import { getUser as getFirebaseUser, getJwtToken } from 'src/auth'
import { setError, setStatus } from 'src/utils'
import { removeData, updateData } from 'src/config/firebase'

import { RequestBody } from 'src/types/server'

const auth = getAuth()

export function getUsers(req: Request, res: Response) {
	res.status(200).json({ status: 'users' })
}
export function getUser(req: Request, res: Response) {
	res.status(200).json({ status: 'user' })
}
export function updateUser(req: Request, res: Response) {
	const user = auth.currentUser as User
	const body: RequestBody = req.body

	updateCurrentUser(auth, {
		...user,
		...body
	})
	updateData(`users/${user.uid}`, {
		...body
	})

	setStatus(
		res,
		{
			code: 200,
			message: 'User updated'
		},
		null
	)
}
export async function deleteUser(req: Request, res: Response) {
	try {
		const user = auth.currentUser
		await removeData(`users/${user?.uid}`)
		await user?.delete()
		setStatus(
			res,
			{
				code: 200,
				message: 'User deleted'
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
export async function signInUser(req: Request, res: Response) {
	const token = req.headers.token
	const isIdToken = Boolean(req.headers['is-id-token'])

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
