import Account, { IAccount } from '../models/Account'

interface AccountData {
  username: string,
  email: string,
  password: string
}

export async function createAccount({ username, email, password }: AccountData) {
  const account = new Account({ username, email, password })
  return await account.save({ validateBeforeSave: true })
}

export async function findByUsernameOrEmail(
  username: string, email: string
): Promise<IAccount[]> {
  const account = await Account.find({
    $or: [
      { email },
      { username }
    ]
  })

  return account
}
