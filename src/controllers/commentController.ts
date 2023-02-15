import { Request, Response } from 'express'
import { serverError } from '../exception/httpStatusError'
import { createCommentService } from '../services/createCommentService'
import { createReplyService } from '../services/createReplyService'

export async function createComment(req: Request, res: Response) {
  const authUserId = res.locals.authUser.id
  const { postId } = req.params
  const { comment } = req.body

  const commentCreated = await createCommentService(authUserId, postId, comment)

  if (!commentCreated) {
    throw serverError('Falha ao criar comentario')
  }

  res.status(200).json({ commentCreated }).end()
}

export async function replyComment(req: Request, res: Response) {
  const authUserId = res.locals.authUser.id
  const { commentId } = req.params
  const { comment } = req.body

  const replyCreated = await createReplyService(authUserId, commentId, comment)

  if (!replyCreated) {
    throw serverError('Falha ao responder comentario')
  }

  res.status(200).json({ replyCreated }).end()
}
