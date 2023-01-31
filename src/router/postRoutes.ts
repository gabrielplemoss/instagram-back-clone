import { Router } from 'express'
import { createPost } from '../controllers/postController'
import postPhotoUpload from '../config/multer/postPhotoUpload'
import { postFieldsValidation } from '../middleware/postFieldsValidation'

const postRoutes = Router()

postRoutes.post('/create', postPhotoUpload, postFieldsValidation, createPost)

export default postRoutes
