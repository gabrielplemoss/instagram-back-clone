import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { findUsingUsernameOrEmail } from '../repositories/accountsRepository'
import { findUserUsingAccountId } from '../repositories/userRepository'
import appError from '../exception/appError'

const secret = `${process.env.SECRET_KEY}`

export default async function authenticateUserService(usernameOrEmail: string, password: string): Promise<any> {
  const accountExists = await findUsingUsernameOrEmail(usernameOrEmail)

  if (!accountExists) {
    return appError('conta não encontrada', 401, true)
  }

  const isPasswordValid = await compare(password, accountExists?.password)

  if (!isPasswordValid) {
    return appError('senha invalida tente novamente', 401, true)
  }

  const user = await findUserUsingAccountId(accountExists._id)

  const payload = {
    id: user._id,
    username: user?.account.username
  }

  const token = sign(payload, secret, { expiresIn: 60 * 30 })

  return {
    user: payload,
    token
  }
}
