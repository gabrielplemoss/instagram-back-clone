import { Request, Response } from 'express'
import { createPostService } from '../services/createPostService'
import { deletePostService } from '../services/deletePostService'

export async function createPost(req: Request, res: Response) {
  const { id } = res.locals.authUser
  const { text } = req.body
  const photos = req.files

  const postCreated = await createPostService(id, text, photos as Express.Multer.File[])

  res.status(201).json({ postCreated }).end()
}

export async function deletePost(req: Request, res: Response) {
  const { id } = res.locals.authUser
  const { postId } = req.params

  await deletePostService(id, postId)

  res.status(204).end()
}
