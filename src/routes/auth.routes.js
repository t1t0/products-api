import {Router} from 'express'

const router = Router()

import * as authController from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'

router.post('/signin',authController.singIn)
router.post('/signup', [verifySignup.checkDuplicatedUsernameOrEmail], authController.singUp)

export default router