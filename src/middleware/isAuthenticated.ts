import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { CustomError } from '../exception/CustomError'

interface TokenPayload {
  id: string
  username: string
  iat: number
  exp: number
}

const secret = process.env.SECRET_KEY

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (authorization === undefined)
    throw new CustomError('Token não definido', 401)

  const [, token] = authorization?.split(' ')

  try {
    const decoded = verify(token, secret as string)
    const { id } = decoded as TokenPayload
    console.log(decoded)

    res.locals.authUser = { id }
    return next()
  } catch (erro) {
    throw new CustomError('Token Invalido', 401)
  }
}
