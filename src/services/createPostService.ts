import { findUserById, insertOnePostInUser } from '../repositories/userRepository'
import { findPostById, savePost, PostWithId } from '../repositories/postRepository'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { dbTransaction } from '../utils/dbTransaction'
import { unauthorized } from '../exception/httpStatusError'

type File = Express.Multer.File

export async function createPostService(
  userId: string,
  text: string,
  photosBody: File[]
): Promise<PostWithId | null> {
  const userObjectId = stringIdToObjectId(userId)
  const userExists = await findUserById(userObjectId)

  if (!userExists) {
    throw unauthorized('Usuario Invalido')
  }
  
  const namesPhotos = photosBody.map(photo => photo.filename)

  const createdPost = await dbTransaction(async (session) => {
    const newPost = await savePost({
      userOwner: userId,
      description: text,
      photos: namesPhotos
    }, session)

    await insertOnePostInUser(userObjectId, newPost._id, session)

    const post = await findPostById(newPost._id, session)

    return post
  })

  return createdPost
}
