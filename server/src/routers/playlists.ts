import { Router } from 'express'

import { addPlaylist, deletePlaylist, getPlaylist, getPlaylists, updatePlaylist } from 'controllers/playlists'
import { checkUser } from 'middleware/index'

const router = Router()

router.route('/').get(getPlaylists).post(addPlaylist)
router.route('/:id').get(getPlaylist)

router.use(checkUser)

router.route('/:id').patch(updatePlaylist).delete(deletePlaylist)

/*
  Base route: /playlists
  Routes:
  - /
    GET, POST
  - /:id
    GET, PATCH, DELETE
*/
export default router
