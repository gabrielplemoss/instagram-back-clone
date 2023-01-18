import Account, { IAccount } from '../models/Account'

interface AccountData {
  username: string,
  email: string,
  password: string
}

export function createAccount({ username, email, password }: AccountData) {
  return new Account({ username, email, password })
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
