import { Router } from 'express'
import { createPost, deletePost, getOnePost } from '../controllers/postController'
import postPhotoUpload from '../config/multer/postPhotoUpload'
import { postFieldsValidation } from '../middleware/postFieldsValidation'
import isAuthenticated from '../middleware/isAuthenticated'

const postRoutes = Router()

postRoutes.post('/create', isAuthenticated, postPhotoUpload, postFieldsValidation, createPost)
postRoutes.delete('/delete/:postId', isAuthenticated, deletePost)
postRoutes.get('/:postId', getOnePost)

export default postRoutes
