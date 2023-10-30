import { Request, Response } from 'express'

export function getSongs(req: Request, res: Response) {
	res.status(200).json({ status: 'songs' })
}
export function getSong(req: Request, res: Response) {
	res.status(200).json({ status: 'song' })
}
export function addSong(req: Request, res: Response) {
	res.status(200).json({ status: 'added' })
}
export function updateSong(req: Request, res: Response) {
	res.status(200).json({ status: 'updated' })
}
export function deleteSong(req: Request, res: Response) {
	res.status(200).json({ status: 'deleted' })
}
