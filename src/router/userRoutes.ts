import { Router } from 'express'
import { getUser } from '../controllers/userController'

const userRoutes = Router()

userRoutes.get('/:username', getUser)

export default userRoutes
