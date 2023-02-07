import { Router } from 'express'
import authRoutes from './authRoutes'
import postRoutes from './postRoutes'
import userRoutes from './userRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/post', postRoutes)
routes.use('/user', userRoutes)

export default routes
