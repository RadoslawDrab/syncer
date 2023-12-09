import { Router } from 'express'

import { addSong, deleteSong, getSong, getSongs, updateSong } from 'controllers/songs'
import { checkBody, checkId, checkSong } from 'middleware/index'
import { containsPartialSong, containsSong } from 'middleware/songs'

const router = Router()

router.route('/').get(getSongs).post(containsSong, checkBody, addSong)
router.route('/:id').get(checkId, getSong)

router.use(checkSong)

router.route('/:id').patch(checkId, checkBody, containsPartialSong, updateSong).delete(checkId, deleteSong)

/*
  Base route: /songs
  Routes:
  - /
    GET, POST
  - /:id
    GET, PATCH, DELETE
*/
export default router
