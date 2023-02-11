import { Request, Response } from 'express'
import { CustomError } from '../exception/CustomError'
import { findPostById } from '../repositories/postRepository'
import { createPostService } from '../services/createPostService'
import { deletePostService } from '../services/deletePostService'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'

interface ReqParams {
  postId: string
}

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

export async function getOnePost(req: Request<ReqParams>, res: Response) {
  const { postId } = req.params
  let post = await findPostById(stringIdToObjectId(postId))

  if (!post) {
    throw new CustomError('Pagina não encontrada', 404)
  }

  res.status(200).json({ post }).end()
}
