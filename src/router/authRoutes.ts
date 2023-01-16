import { Router } from 'express'
import { signinController, signupController } from '../controllers/authController'

const authRoutes = Router()

authRoutes.post('/signup', signupController)
authRoutes.post('/signin', signinController)

export default authRoutes
