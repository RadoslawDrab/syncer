import { Request, Response, NextFunction } from 'express'

import { CheckCreatorHandler, KeysType, checkCreator, containsPartialType, containsType } from '.'

import { Song } from 'shared/types/database'

const songKeys: KeysType<Song> = {
	mandatory: [
		'name',
		'artist',
		'album',
		'releaseDate',
		'genres',
		'isExplicit',
		'youtubeUrl',
		'lyricsOffset',
		'trimStart',
		'trimEnd',
		'time',
		'trackCount',
		'trackNumber',
		'artworkUrl'
	],
	optional: ['lyrics']
}

export function containsSong(req: Request, res: Response, next: NextFunction) {
	containsType.call(songKeys, req, res, next)
}
export function containsPartialSong(req: Request, res: Response, next: NextFunction) {
	containsPartialType.call(songKeys, req, res, next)
}

export const checkSongsCreator: CheckCreatorHandler = checkCreator.bind('songs')
