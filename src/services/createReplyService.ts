import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { dbTransaction } from '../utils/dbTransaction'
import { findOneCommentById, ICommentWithId, insertReplyInComment, saveReply } from '../repositories/commentRepository'
import { notFound } from '../exception/httpStatusError'

export async function createReplyService(
  authUserId: string,
  commentId: string,
  reply: string
): Promise<ICommentWithId | null> {
  const authUserObjectId = stringIdToObjectId(authUserId)
  const commentIdObjectId = stringIdToObjectId(commentId)

  const commentExists = await findOneCommentById(commentIdObjectId)

  if (!commentExists) {
    throw notFound('Comentario não encontrado')
  }

  const newReply = await dbTransaction(async (session) => {
    const replySaved = await saveReply(authUserObjectId, commentIdObjectId, reply, session)
    const insertedReply = await insertReplyInComment(commentIdObjectId, replySaved._id, session)

    if (replySaved && insertedReply.modifiedCount > 0) {
      return replySaved
    }

    throw new Error()
  })

  return newReply
}
