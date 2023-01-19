import { Router } from 'express'
import { signinController, signupController } from '../controllers/authController'
import signupValidation from '../middleware/signupValidation'

const authRoutes = Router()

authRoutes.post('/signup', signupValidation, signupController)
authRoutes.post('/signin', signinController)

export default authRoutes
