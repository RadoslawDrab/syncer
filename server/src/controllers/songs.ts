import { v4 } from 'uuid'

import { FullSong, Song, SongItem } from 'shared/types/database'
import { Endpoint } from 'utils/classes'

const endpoint = new Endpoint<FullSong>('/songs', 'Song')
endpoint.setAddCallback<FullSong, SongItem>((data, req) => {
	return { id: v4(), createdAt: Date.now(), updatedAt: Date.now(), userId: req.query.userId?.toString() ?? '', song: data }
})
endpoint.setUpdateCallback<SongItem, SongItem>((data) => {
	return { ...data, updatedAt: Date.now() }
})
endpoint.setUpdateBodyCallback<SongItem, SongItem, Partial<Song>>((data, body) => {
	return { ...data, song: { ...data.song, ...body } }
})

export const getSong = endpoint.getSingle
export const getSongs = endpoint.getAll
export const addSong = endpoint.add
export const updateSong = endpoint.update
export const deleteSong = endpoint.delete
