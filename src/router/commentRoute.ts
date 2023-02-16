import { Router } from 'express'
import { createComment, editComment, likeComment, replyComment, unlikeComment } from '../controllers/commentController'
import commentValidation from '../middleware/commentValidation'

const commentRoutes = Router()

commentRoutes.post('/create/:postId', commentValidation, createComment)
commentRoutes.post('/reply/:commentId', commentValidation, replyComment)
commentRoutes.post('/edit/:commentId', commentValidation, editComment)
commentRoutes.post('/like/:commentId', likeComment)
commentRoutes.post('/unlike/:commentId', unlikeComment)

export default commentRoutes
