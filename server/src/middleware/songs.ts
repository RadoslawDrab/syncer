import { NextFunction, Request, Response } from 'express'

/** Checks whether current user's id is the same as creator's id */
export function checkSong(req: Request, res: Response, next: NextFunction) {
	// Check user's id and creator's id

	next()
}
