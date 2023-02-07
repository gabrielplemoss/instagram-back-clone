import { Request, Response } from 'express'
import { CustomError } from '../exception/CustomError'
import { createPostService } from '../services/createPostService'
import { deletePostService } from '../services/deletePostService'

export async function createPost(req: Request, res: Response) {
  const { id } = res.locals.authUser
  const { text } = req.body
  const photos = req.files

  const postCreated = await createPostService(id, text, photos as Express.Multer.File[])

  if (!postCreated) {
    throw new CustomError('Falha ao criar post', 500)
  }

  res.status(201).json({ postCreated }).end()
}

export async function deletePost(req: Request, res: Response) {
  const { id } = res.locals.authUser
  const { postId } = req.params

  const deletedPost = await deletePostService(id, postId)

  if (!deletedPost) {
    throw new CustomError('Falha ao deletar post', 500)
  }

  return res.status(204).end()
}
