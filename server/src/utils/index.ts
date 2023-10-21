import { Response } from 'express'

import { Status } from 'types/server'

export function setStatus<T extends object>(res: Response, status: Status, data: T) {
	res.status(status.code).json({ status, data })
}

export function setError(res: Response, status: Status) {
	res.status(status.code).json({ status })
}
