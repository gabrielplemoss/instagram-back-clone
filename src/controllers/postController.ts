import { Request, Response } from 'express'
import { createPostService } from '../services/createPostService'

export async function createPost(req: Request, res: Response) {
  const { id } = res.locals.authUser
  const { text } = req.body
  const photos = req.files

  const postCreated = await createPostService(id, text, photos as Express.Multer.File[])

  res.status(201).json({ postCreated }).end()
}
