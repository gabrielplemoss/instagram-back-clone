import { Request, Response } from 'express'
import { CustomError } from '../exception/CustomError'
import { findUserByName } from '../repositories/userRepository'
import { followUserService } from '../services/followUserService'

export async function getUser(req: Request, res: Response) {
  const { username } = req.params
  const user = await findUserByName(username)

  if (!user) {
    throw new CustomError('Pagina não encontrada', 404)
  }

  res.status(200).json({ user }).end()
}

export async function followUser(req: Request, res: Response) {
  const { userId } = req.params
  const authUserId = res.locals.authUser.id

  if (userId === authUserId) {
    throw new CustomError('Falha ao seguir usuario', 500)
  }

  const followResponse = await followUserService(authUserId, userId)

  if (!followResponse) {
    throw new CustomError('Falha ao seguir usuario', 400)
  }

  res.status(200).end()
}
