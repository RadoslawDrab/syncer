import { Router } from 'express'

import { addUser, deleteUser, getUser, getUsers, updateUser } from 'controllers/users'
import { checkUser } from 'middleware/users'

const router = Router()

router.route('/').get(getUsers).post(addUser)
router.route('/:id').get(getUser)

router.use(checkUser)

router.route('/:id').patch(updateUser).delete(deleteUser)

/*
  Base route: /users
  Routes:
  - /
    GET, POST
  - /:id
    GET, PATCH, DELETE
*/
export default router
