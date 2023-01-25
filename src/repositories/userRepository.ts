import mongoose from 'mongoose'
import User, { IUser } from '../models/User'

type ObjectId = mongoose.Types.ObjectId

export async function createUser(accountId: ObjectId, username: String): Promise<IUser | any> {
  const user = new User()
  user.account.id = accountId
  user.account.username = username
  return await user.save({ validateBeforeSave: true })
}

export async function findUserUsingAccountId(id: ObjectId): Promise<IUser | any> {
  const user = await User.findOne({
    'account.id': id
  })

  return user
}
