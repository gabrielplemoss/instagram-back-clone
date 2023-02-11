import { Request, Response } from 'express'
import { createAccountService } from '../services/createAccountService'
import { sign } from 'jsonwebtoken'
import authenticateUserService from '../services/authenticateUserService'
import { serverError } from '../exception/httpStatusError'

const secret = process.env.SECRET_KEY

interface TokenPayload {
  id: string,
  username: string
}

export async function signupController(req: Request, res: Response) {
  const { username, email, password } = req.body

  const createdAccount: TokenPayload | any = await createAccountService({ username, email, password })

  if (!createdAccount) {
    throw serverError('Falha ao cadastrar usuario')
  }

  const token = sign(createdAccount as TokenPayload,
    secret as string,
    { expiresIn: 60 * 30 }
  )

  res.status(201).json({ user: createdAccount, token }).end()
}

export async function signinController(req: Request, res: Response) {
  const { username, password } = req.body

  const { user, token } = await authenticateUserService(username, password)

  res.status(200).json({ user, token }).end()
}
