import mongoose from 'mongoose'
import User from '../models/User'

type ObjectId = mongoose.Types.ObjectId

export async function createUser(accountId: ObjectId, username: String) {
  const user = new User()
  user.account.id = accountId
  user.account.username = username
  return await user.save({ validateBeforeSave: true })
}
