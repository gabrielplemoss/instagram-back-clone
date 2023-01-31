import { Router } from 'express'
import { createPost, deletePost } from '../controllers/postController'
import postPhotoUpload from '../config/multer/postPhotoUpload'
import { postFieldsValidation } from '../middleware/postFieldsValidation'

const postRoutes = Router()

postRoutes.post('/create', postPhotoUpload, postFieldsValidation, createPost)
postRoutes.delete('/delete/:postId', deletePost)

export default postRoutes
