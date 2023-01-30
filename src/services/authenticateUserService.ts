import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { findUsingUsernameOrEmail } from '../repositories/accountsRepository'
import { findUserUsingAccountId } from '../repositories/userRepository'
import { CustomError } from '../exception/CustomError'

const secret = process.env.SECRET_KEY

export default async function authenticateUserService(usernameOrEmail: string, password: string): Promise<any> {
  const accountExists = await findUsingUsernameOrEmail(usernameOrEmail)

  if (!accountExists) {
    throw new CustomError('conta não encontrada', 401)
  }

  const isPasswordValid = await compare(password, accountExists?.password)

  if (!isPasswordValid) {
    throw new CustomError('senha invalida tente novamente', 401)
  }

  const user = await findUserUsingAccountId(accountExists._id)

  const payload = {
    id: user._id,
    username: user?.account.username
  }

  const token = sign(payload, secret as string, { expiresIn: 60 * 30 })

  return {
    user: payload,
    token
  }
}
