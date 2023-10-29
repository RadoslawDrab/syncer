import { Response, Request } from 'express'

import { getUser as getFirebaseUser, getJwtToken } from 'src/auth'
import { setError, setStatus } from 'src/utils'

export function getUsers(req: Request, res: Response) {
	res.status(200).json({ status: 'users' })
}
export function getUser(req: Request, res: Response) {
	res.status(200).json({ status: 'user' })
}
export function addUser(req: Request, res: Response) {
	res.status(200).json({ status: 'added' })
}
export function updateUser(req: Request, res: Response) {
	res.status(200).json({ status: 'updated' })
}
export function deleteUser(req: Request, res: Response) {
	res.status(200).json({ status: 'deleted' })
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
				message: 'User successfully signed in'
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
export function signUpUser(req: Request, res: Response) {
	res.status(200).json({ status: 'signed up' })
}
export function logOutUser(req: Request, res: Response) {
	res.status(200).json({ status: 'logged out' })
}
