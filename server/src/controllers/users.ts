import { Response, Request } from 'express'

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
