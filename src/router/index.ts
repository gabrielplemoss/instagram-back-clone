import { Router } from 'express'
import authRoutes from './authRoutes'
import followersRoutes from './follow'
import isAuthenticated from '../middleware/isAuthenticated'
import postRoutes from './postRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/followers', isAuthenticated, followersRoutes)
routes.use('/post', isAuthenticated, postRoutes)

export default routes
