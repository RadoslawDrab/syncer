import { v4 } from 'uuid'

import { Endpoint } from 'utils/classes'

import { Playlist } from 'shared/types/database'

const endpoint = new Endpoint<Playlist>('playlists/', 'Playlist')

endpoint.setAddCallback<Playlist, Playlist>(async (data) => {
	return { ...data, id: v4(), createdAt: Date.now(), updatedAt: Date.now() }
})
endpoint.setUpdateCallback<Playlist, Playlist>(async (data) => {
	return { ...data, updatedAt: Date.now() }
})

export const getPlaylists = endpoint.getAll
export const getPlaylist = endpoint.getSingle
export const addPlaylist = endpoint.add
export const updatePlaylist = endpoint.update
export const deletePlaylist = endpoint.delete
