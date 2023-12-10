import { Request, Response, NextFunction } from 'express'

import { setError } from 'utils'
import { KeysType, containsPartialType, containsType } from '.'

import { User } from 'shared/types/database'

const userKeys: KeysType<
	User & {
		displayName: string
		email: string
	}
> = {
	mandatory: ['displayName', 'email']
}

export function containsUser(req: Request, res: Response, next: NextFunction) {
	containsType.call(userKeys, req, res, next)
}
export function containsPartialUser(req: Request, res: Response, next: NextFunction) {
	containsPartialType.call(userKeys, req, res, next)
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
