import { Request, Response, NextFunction } from 'express'

import { setError } from 'utils'

import { RequestBody } from 'types/server'

export function checkBody(req: Request, res: Response, next: NextFunction) {
	const body: RequestBody | undefined = req.body
	if (!body) {
		setError(res, {
			code: 400,
			message: 'No body in request'
		})
		return
	}

	if (
		!(
			!!body.user.displayName ||
			!!body.user.email ||
			body.userData.playlistIds?.length === 0 ||
			body.userData.songIds?.length === 0
		)
	) {
		setError(res, {
			code: 400,
			message: 'No proper data to update in body'
		})
		return
	}
	next()
}
export function checkToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.token

	if (typeof token !== 'string') {
		setError(res, {
			code: 400,
			message: 'No token header'
		})
		return
	}
	next()
}
