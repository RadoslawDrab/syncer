import { Router } from 'express'

import { addUser, deleteUser, getUser, getUsers, updateUser } from 'controllers/users'

const router = Router()

router.route('/').get(getUsers)
router.route('/:id').get(getUser).post(addUser).patch(updateUser).delete(deleteUser)

export default router
