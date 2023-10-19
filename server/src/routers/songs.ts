import { Router } from 'express'

import { addSong, deleteSong, getSong, getSongs, updateSong } from 'controllers/songs'
import { checkSong } from 'middleware/songs'

const router = Router()

router.route('/').get(getSongs).post(addSong)
router.route('/:id').get(getSong)

router.use(checkSong)
router.route('/:id').patch(updateSong).delete(deleteSong)

export default router
