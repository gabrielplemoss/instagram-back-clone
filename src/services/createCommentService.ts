import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { dbTransaction } from '../utils/dbTransaction'
import { saveComment } from '../repositories/commentRepository'
import { findPostById, insertComment } from '../repositories/postRepository'
import { notFound } from '../exception/httpStatusError'

export async function createCommentService(authUserId: string, postId: string, comment: string) {
  const authUserObjectId = stringIdToObjectId(authUserId)
  const postIdObjectId = stringIdToObjectId(postId)

  const postExists = await findPostById(postIdObjectId)

  if (!postExists) {
    throw notFound('Post não encontrado')
  }

  const commentCreated = await dbTransaction(async (session) => {
    const commentSaved = await saveComment(authUserObjectId, postIdObjectId, comment, session)
    await insertComment(postIdObjectId, commentSaved._id, session)

    return commentSaved
  })

  return commentCreated
}
