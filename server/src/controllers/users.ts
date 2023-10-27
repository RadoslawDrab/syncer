import { Response, Request } from 'express'

import { getUser as getFirebaseUser } from 'src/auth'
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
	try {
		const token = req.headers.token
		if (!token || typeof token !== 'string') {
			setError(res, {
				code: 400,
				message: 'No token value'
			})
			return
		}
		const user = await getFirebaseUser(token)
		setStatus(
			res,
			{
				code: 200,
				message: 'User successfully signed in'
			},
			{ user }
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
