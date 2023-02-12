import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated'
import authRoutes from './authRoutes'
import commentRoutes from './commentRoute'
import postRoutes from './postRoutes'
import userRoutes from './userRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/post', postRoutes)
routes.use('/user', userRoutes)
routes.use('/comment', isAuthenticated, commentRoutes)

export default routes
