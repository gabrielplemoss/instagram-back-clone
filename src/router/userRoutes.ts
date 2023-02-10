import { Router } from 'express'
import { followUser, getUser, unfollowUser } from '../controllers/userController'
import isAuthenticated from '../middleware/isAuthenticated'

const userRoutes = Router()

userRoutes.get('/:username', getUser)
userRoutes.post('/follow/:userId', isAuthenticated, followUser)
userRoutes.post('/unfollow/:userId', isAuthenticated, unfollowUser)

export default userRoutes
