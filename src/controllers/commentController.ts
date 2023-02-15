import { Request, Response } from 'express'
import { notFound, serverError } from '../exception/httpStatusError'
import { editCommentRepo, findOneCommentById } from '../repositories/commentRepository'
import { createCommentService } from '../services/createCommentService'
import { createReplyService } from '../services/createReplyService'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'

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

export async function editComment(req: Request, res: Response) {
  const authUserId = res.locals.authUser.id
  const { commentId } = req.params
  const { comment } = req.body

  const authUserIdObjectId = stringIdToObjectId(authUserId)
  const commentIdObjectId = stringIdToObjectId(commentId)

  const commentExists = await findOneCommentById(commentIdObjectId)

  if(!commentExists){
    throw notFound('Comentario não encontrado')
  }

  const updatedComent = await editCommentRepo(
    authUserIdObjectId,
    commentIdObjectId,
    comment
  )

  if(!updatedComent){
    throw serverError('Falha ao criar post')
  }

  return res.status(200).json({ updatedComent }).end()
}
