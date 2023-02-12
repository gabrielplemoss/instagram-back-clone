import { Router } from 'express'
import { createComment } from '../controllers/commentController'
import commentValidation from '../middleware/commentValidation'

const commentRoutes = Router()

commentRoutes.post('/create/:postId', commentValidation, createComment)

export default commentRoutes
