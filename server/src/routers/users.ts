import { Router } from 'express'

import { deleteUser, getUser, getUsers, signInUser, signOutUser, updateUser } from 'controllers/users'
import { checkUser } from 'middleware/index'
import { checkToken, containsPartialUser } from 'middleware/users'

const router = Router()

router.route('/').get(getUsers)
router.route('/:id').get(getUser)

router.route('/auth/sign-in').get(checkToken, signInUser)
router.route('/auth/sign-out').get(signOutUser)

router.use(checkUser)

router.route('/:id').patch(containsPartialUser, updateUser).delete(deleteUser)

/*
  Base route: /users
  Routes:
  - /
    GET
  - /auth/sign-in
    GET
  - /auth/sign-out
    GET
  - /:id
    GET, PATCH, DELETE
*/
export default router
