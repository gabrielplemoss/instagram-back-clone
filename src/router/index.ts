import { Router } from 'express'
import authRoutes from './authRoutes'
import postRoutes from './postRoutes'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/post', postRoutes)

export default routes
