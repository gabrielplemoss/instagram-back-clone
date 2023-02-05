import { CustomError } from '../exception/CustomError'
import * as postRepository from '../repositories/postRepository'
import * as userRepository from '../repositories/userRepository'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'

export async function deletePostService(userId: string, postId: string) {
  const userObjectId = stringIdToObjectId(userId)
  const postObjectId = stringIdToObjectId(postId)
  const postExists = await postRepository.findPostById(postObjectId)

  if (!postExists)
    throw new CustomError('Postagem não encontrada', 404)

  const userPost = await userRepository.removeOnePost(userObjectId, postObjectId)

  if (userPost.modifiedCount === 0)
    throw new Error()

  const postDeleted = await postRepository.deletePost(userObjectId, postObjectId)

  if (postDeleted.deletedCount === 0)
    throw new Error()
}
