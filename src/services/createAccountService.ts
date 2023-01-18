import { IAccount } from '../models/Account'
import { createAccount } from '../repositories/accountsRepository'
import { hash } from 'bcryptjs'

interface RequestBody {
  username: string,
  email: string,
  password: string
}

export async function createAccountService({ username, email, password }: RequestBody): Promise<IAccount> {
  const hashedPassword = await hash(password, 12)
  const newAccount = createAccount({ username, email, password: hashedPassword })
  const createdAccount = await newAccount.save({ validateBeforeSave: true })

  return createdAccount
}
