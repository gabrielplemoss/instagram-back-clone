import { Request, Response } from 'express'
import { createAccountService } from '../services/createAccountService'
import { sign } from 'jsonwebtoken'

export async function signupController(req: Request, res: Response) {
  const { username, email, password } = req.body
  const secret = `${process.env.SECRET_KEY}`

  const createdAccount = await createAccountService({ username, email, password })
  const token = sign({ id: createdAccount._id }, secret, { expiresIn: 60 * 30 })

  res.status(201).json({ user: createdAccount, token }).end()
}

export function signinController(req: Request, res: Response) { }
