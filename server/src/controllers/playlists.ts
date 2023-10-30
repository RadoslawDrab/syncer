import { Response, Request } from 'express'

export function getPlaylists(req: Request, res: Response) {
	res.status(200).json({ status: 'playlists' })
}
export function getPlaylist(req: Request, res: Response) {
	res.status(200).json({ status: 'playlist' })
}
export function addPlaylist(req: Request, res: Response) {
	res.status(200).json({ status: 'added' })
}
export function updatePlaylist(req: Request, res: Response) {
	res.status(200).json({ status: 'updated' })
}
export function deletePlaylist(req: Request, res: Response) {
	res.status(200).json({ status: 'deleted' })
}
