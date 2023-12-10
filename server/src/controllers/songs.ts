import { v4 } from 'uuid'

import { Endpoint } from 'utils/classes'

import { Song, SongItem } from 'shared/types/database'

const endpoint = new Endpoint<SongItem>('/songs', 'Song')

endpoint.setAddCallback<Song, SongItem>(async (data, req) => {
	return { id: v4(), createdAt: Date.now(), updatedAt: Date.now(), userId: req.query.userId?.toString() ?? '', song: data }
})
endpoint.setUpdateCallback<SongItem, SongItem>(async (data) => {
	return { ...data, updatedAt: Date.now() }
})
endpoint.setUpdateBodyCallback<SongItem, SongItem, Partial<Song>>(async (data, body) => {
	return { ...data, song: { ...data.song, ...body } }
})

export const getSong = endpoint.getSingle
export const getSongs = endpoint.getAll
export const addSong = endpoint.add
export const updateSong = endpoint.update
export const deleteSong = endpoint.delete
