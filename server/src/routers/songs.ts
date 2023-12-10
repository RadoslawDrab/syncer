import { Router } from 'express'

import { addSong, deleteSong, getSong, getSongs, updateSong } from 'controllers/songs'
import { checkBody, checkId, checkUser } from 'middleware/index'
import { checkSongsCreator, containsPartialSong, containsSong } from 'middleware/songs'

const router = Router()

router.route('/').get(getSongs).post(checkBody, containsSong, addSong)
router.route('/:id').get(checkId, getSong)

router
	.route('/:id')
	.patch(checkId, checkUser, checkSongsCreator, checkBody, containsPartialSong, updateSong)
	.delete(checkId, checkUser, checkSongsCreator, deleteSong)

/*
  Base route: /songs
  Routes:
  - /
    GET, POST
  - /:id
    GET, PATCH, DELETE
*/
export default router
