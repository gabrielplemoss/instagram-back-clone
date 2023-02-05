import mongoose, { ClientSession } from 'mongoose'
import Account, { IAccount } from '../models/Account'

type ObjectId = mongoose.Types.ObjectId

interface AccountData {
  username: string,
  email: string,
  password: string
}

type IAccountWithId = IAccount & { _id: ObjectId }

export async function saveAccount({ username, email, password }: AccountData,
  session: ClientSession
): Promise<IAccountWithId> {
  const account = new Account({ username, email, password })
  return await account.save({ validateBeforeSave: true, session })
}

export async function findById(id: ObjectId): Promise<IAccountWithId | null> {
  const account = await Account.findById(id)
  return account
}

export async function findUsingUsernameAndEmail(
  username: string, email: string
): Promise<IAccountWithId[]> {
  const account = await Account.find({
    $or: [
      { email },
      { username }
    ]
  })

  return account
}

export async function findUsingUsernameOrEmail(usernameOrEmail: string): Promise<IAccountWithId | null> {
  const foundUser = await Account.findOne({
    $or: [
      { email: usernameOrEmail },
      { username: usernameOrEmail },
    ]
  })

  return foundUser
}
