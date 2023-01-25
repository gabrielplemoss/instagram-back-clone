import { Router } from 'express'
import { signinController, signupController } from '../controllers/authController'
import signinValidation from '../middleware/signinValidation'
import signupValidation from '../middleware/signupValidation'

const authRoutes = Router()

authRoutes.post('/signup', signupValidation, signupController)
authRoutes.post('/signin', signinValidation, signinController)

export default authRoutes
