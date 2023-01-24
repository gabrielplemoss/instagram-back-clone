import { Request, Response } from 'express'
import { createAccountService } from '../services/createAccountService'
import { sign } from 'jsonwebtoken'
import { createUser } from '../repositories/userRepository'

export async function signupController(req: Request, res: Response) {
  const { username, email, password } = req.body
  const secret = `${process.env.SECRET_KEY}`

  const createdAccount = await createAccountService({ username, email, password })
  const createdUser = await createUser(createdAccount._id, createdAccount.username)

  const userInfo = {
    _id: createdUser._id,
    username: createdUser.account.username
  }

  const token = sign(userInfo, secret, { expiresIn: 60 * 30 })

  res.status(201).json({ user: userInfo, token }).end()
}

export function signinController(req: Request, res: Response) { }
