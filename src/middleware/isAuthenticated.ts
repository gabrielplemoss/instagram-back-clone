import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { unauthorized } from '../exception/httpStatusError'

interface TokenPayload {
  id: string
  username: string
  iat: number
  exp: number
}

const secret = process.env.SECRET_KEY

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (authorization === undefined) {
    throw unauthorized('Token não definido')
  }

  const [, token] = authorization?.split(' ')

  try {
    const decoded = verify(token, secret as string)
    const { id } = decoded as TokenPayload

    if (!id) throw new Error()

    res.locals.authUser = { id }
    return next()
  } catch (erro) {
    throw unauthorized('Token Invalido')
  }
}
