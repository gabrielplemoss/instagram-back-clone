import { Request, Response } from 'express'
import { badRequest, notFound, serverError } from '../exception/httpStatusError'
import { findUserByName } from '../repositories/userRepository'
import { followUserService } from '../services/followUserService'
import { unfollowUserService } from '../services/unfollowUserService'

export async function getUser(req: Request, res: Response) {
  const { username } = req.params
  const user = await findUserByName(username)

  if (!user) {
    throw notFound('Usuario não encontrada')
  }

  res.status(200).json({ user }).end()
}

export async function followUser(req: Request, res: Response) {
  const { userId } = req.params
  const authUserId = res.locals.authUser.id

  if (userId === authUserId) {
    throw badRequest('Falha ao seguir usuario')
  }

  const followResponse = await followUserService(authUserId, userId)

  if (!followResponse) {
    throw serverError('Falha ao seguir usuario')
  }

  res.status(200).end()
}

export async function unfollowUser(req: Request, res: Response) {
  const { userId } = req.params
  const authUserId = res.locals.authUser.id

  if (userId === authUserId) {
    throw badRequest('Falha ao deixar de seguir usuario')
  }

  const unfollowResponse = await unfollowUserService(authUserId, userId)

  if (!unfollowResponse) {
    throw serverError('Falha ao deixar de seguir usuario')
  }

  res.status(200).end()
}
