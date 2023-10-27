import { Router } from 'express'

import { addUser, deleteUser, getUser, getUsers, signInUser, updateUser } from 'controllers/users'
import { checkUser } from 'middleware/index'

const router = Router()

router.route('/').get(getUsers).post(addUser)
router.route('/auth').get(signInUser)
router.route('/:id').get(getUser)

router.use(checkUser)

router.route('/:id').patch(updateUser).delete(deleteUser)

/*
  Base route: /users
  Routes:
  - /
    GET, POST
  - /auth
    GET
  - /:id
    GET, PATCH, DELETE
*/
export default router
