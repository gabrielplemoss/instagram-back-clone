import { Router } from 'express'
import { followUser, getUser } from '../controllers/userController'
import isAuthenticated from '../middleware/isAuthenticated'

const userRoutes = Router()

userRoutes.get('/:username', getUser)
userRoutes.post('/follow/:userId', isAuthenticated, followUser)

export default userRoutes
