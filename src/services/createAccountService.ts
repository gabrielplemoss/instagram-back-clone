import { IAccount } from '../models/Account'
import { createAccount } from '../repositories/accountsRepository'

interface RequestBody {
  username: string,
  email: string,
  password: string
}

export async function createAccountService({ username, email, password }: RequestBody): Promise<IAccount> {
  const newAccount = createAccount({ username, email, password })
  const createdAccount = await newAccount.save({ validateBeforeSave: true })

  return createdAccount
}
