import { Request, Response } from 'express'
import { serverError } from '../exception/httpStatusError'
import { createCommentService } from '../services/createCommentService'

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
