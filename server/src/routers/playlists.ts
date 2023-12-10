import { Router } from 'express'

import { addPlaylist, deletePlaylist, getPlaylist, getPlaylists, updatePlaylist } from 'controllers/playlists'
import { checkBody, checkId, checkUser } from 'middleware/index'
import { checkPlaylistCreator, containsPartialPlaylist, containsPlaylist } from 'middleware/playlists'

const router = Router()

router.route('/').get(getPlaylists).post(checkBody, containsPlaylist, addPlaylist)
router.route('/:id').get(checkId, getPlaylist)

router
	.route('/:id')
	.patch(checkId, checkUser, checkPlaylistCreator, checkBody, containsPartialPlaylist, updatePlaylist)
	.delete(checkId, checkUser, checkPlaylistCreator, deletePlaylist)

/*
  Base route: /playlists
  Routes:
  - /
    GET, POST
  - /:id
    GET, PATCH, DELETE
*/
export default router
