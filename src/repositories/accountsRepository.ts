import Account, { IAccount } from '../models/Account'

interface AccountData {
  username: string,
  email: string,
  password: string
}

export async function createAccount({ username, email, password }: AccountData): Promise<IAccount | any> {
  const account = new Account({ username, email, password })
  return await account.save({ validateBeforeSave: true })
}

export async function findUsingUsernameAndEmail(
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

export async function findUsingUsernameOrEmail(usernameOrEmail: string): Promise<IAccount | any> {
  const foundUser = await Account.findOne({
    $or: [
      { email: usernameOrEmail },
      { username: usernameOrEmail },
    ]
  })

  return foundUser
}
