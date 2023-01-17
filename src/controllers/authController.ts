import { Request, Response } from 'express'
import { createAccountService } from '../services/createAccountService'

export async function signupController(req: Request, res: Response) {
  const { username, email, password } = req.body

  const createdAccount = await createAccountService({ username, email, password })

  res.status(201).json({ user: createdAccount }).end()
}

export function signinController(req: Request, res: Response) { }
