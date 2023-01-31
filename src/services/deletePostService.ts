import { CustomError } from '../exception/CustomError'
import * as postRepository from '../repositories/postRepository'
import * as userRepository from '../repositories/userRepository'

export async function deletePostService(userId: string, postId: string) {
  const postExists = await postRepository.findPostById(postId)

  if (!postExists)
    throw new CustomError('Postagem não encontrada', 404)

  const userPost = await userRepository.removeOnePost(userId, postId)

  if (userPost.modifiedCount === 0)
    throw new Error()

  const postDeleted = await postRepository.deletePost(userId, postId)

  if (postDeleted.deletedCount === 0)
    throw new Error()
}
