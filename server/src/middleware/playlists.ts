import { Request, Response, NextFunction } from 'express'

import { KeysType, containsPartialType, containsType } from '.'

import { Playlist } from 'shared/types/database'

const playlistKeys: KeysType<Playlist> = {
	mandatory: ['name', 'songIds', 'userId']
}

export function containsPlaylist(req: Request, res: Response, next: NextFunction) {
	containsType.call(playlistKeys, req, res, next)
}
export function containsPartialPlaylist(req: Request, res: Response, next: NextFunction) {
	containsPartialType.call(playlistKeys, req, res, next)
}
