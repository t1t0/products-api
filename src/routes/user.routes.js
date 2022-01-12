import {Router} from 'express'

const router = Router()

import * as userController from '../controllers/users.controller'
import { authJWT, verifySignup } from '../middlewares'

router.get('/', [authJWT.verifyToken, authJWT.isAdmin], userController.getAllUsers)
router.post('/', 
    [authJWT.verifyToken, authJWT.isAdmin, verifySignup.checkRolesExists, verifySignup.checkDuplicatedUsernameOrEmail], 
    userController.createUser
)

export default router