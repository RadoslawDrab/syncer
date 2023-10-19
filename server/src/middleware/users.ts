import { NextFunction, Request, Response } from 'express'

export function checkUser(req: Request, res: Response, next: NextFunction) {
	// Check user's auth

	next()
}
