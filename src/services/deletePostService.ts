import * as postRepository from '../repositories/postRepository'
import * as userRepository from '../repositories/userRepository'
import { dbTransaction } from '../utils/dbTransaction'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { CustomError } from '../exception/CustomError'

export async function deletePostService(userId: string, postId: string): Promise<boolean | null> {
  const userObjectId = stringIdToObjectId(userId)
  const postObjectId = stringIdToObjectId(postId)
  const postExist = await postRepository.findPostById(postObjectId)

  if (!postExist) {
    throw new CustomError('Postagem não encontrada', 404)
  }

  const deletedPost = await dbTransaction(async (session) => {
    await userRepository.removeOnePostInUser(userObjectId, postObjectId, session)
    await postRepository.deletePost(userObjectId, postObjectId, session)

    return true
  })

  return deletedPost
}
