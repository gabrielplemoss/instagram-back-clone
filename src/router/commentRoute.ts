import { Router } from 'express'
import { createComment, editComment, replyComment } from '../controllers/commentController'
import commentValidation from '../middleware/commentValidation'

const commentRoutes = Router()

commentRoutes.post('/create/:postId', commentValidation, createComment)
commentRoutes.post('/reply/:commentId', commentValidation, replyComment)
commentRoutes.post('/edit/:commentId', commentValidation, editComment)

export default commentRoutes
