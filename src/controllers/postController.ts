import { Request, Response } from 'express'
import { notFound, serverError } from '../exception/httpStatusError'
import { findPostById } from '../repositories/postRepository'
import { createPostService } from '../services/createPostService'
import { deletePostService } from '../services/deletePostService'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'

export async function createPost(req: Request, res: Response) {
  const authUserId = res.locals.authUser.id
  const { text } = req.body
  const photos = req.files

  const postCreated = await createPostService(authUserId, text, photos as Express.Multer.File[])

  if (!postCreated) {
    throw serverError('Falha ao criar post')
  }

  res.status(201).json({ postCreated }).end()
}

export async function deletePost(req: Request, res: Response) {
  const authUserId = res.locals.authUser.id
  const { postId } = req.params

  const deletedPost = await deletePostService(authUserId, postId)

  if (!deletedPost) {
    throw serverError('Falha ao deletar post')
  }

  return res.status(204).end()
}

export async function getOnePost(req: Request, res: Response) {
  const { postId } = req.params
  let post = await findPostById(stringIdToObjectId(postId))

  if (!post) {
    throw notFound('Pagina não encontrada')
  }

  res.status(200).json({ post }).end()
}
