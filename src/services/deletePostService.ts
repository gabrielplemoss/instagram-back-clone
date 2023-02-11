import * as postRepository from '../repositories/postRepository'
import * as userRepository from '../repositories/userRepository'
import { dbTransaction } from '../utils/dbTransaction'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { notFound } from '../exception/httpStatusError'

export async function deletePostService(userId: string, postId: string): Promise<boolean | null> {
  const userObjectId = stringIdToObjectId(userId)
  const postObjectId = stringIdToObjectId(postId)
  const postExist = await postRepository.findPostById(postObjectId)

  if (!postExist) {
    throw notFound('Postagem não encontrada')
  }

  const deletedPost = await dbTransaction(async (session) => {
    await userRepository.removeOnePostInUser(userObjectId, postObjectId, session)
    await postRepository.deletePost(userObjectId, postObjectId, session)

    return true
  })

  return deletedPost
}
