import { insertOnePost, findUserById } from '../repositories/userRepository'
import { CustomError } from '../exception/CustomError'
import { findPostById, savePost } from '../repositories/postRepository'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'

type File = Express.Multer.File

export async function createPostService(userId: string, text: string, photosBody: File[]): Promise<any> {
  const userObjectId = stringIdToObjectId(userId)
  const userExists = await findUserById(userObjectId)

  if (!userExists)
    throw new CustomError('Usuario Invalido', 401)

  const namesPhotos = photosBody.map(photo => photo.filename)

  const newPost = await savePost({
    userOwner: userId,
    description: text,
    photos: namesPhotos
  })
  const insertedPost = await insertOnePost(userObjectId, newPost._id)

  if (insertedPost.modifiedCount === 0)
    throw new CustomError('Falha ao criar post', 400)

  const post = await findPostById(newPost._id)

  if (!post)
    throw new CustomError('Postagem não encontrada', 400)

  return post
}
