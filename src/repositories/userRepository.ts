import mongoose, { ClientSession, UpdateWriteOpResult } from 'mongoose'
import User, { IUser } from '../models/User'

type ObjectId = mongoose.Types.ObjectId

export async function saveUser(accountId: ObjectId, username: String,
  session: ClientSession
): Promise<IUser | any> {
  const user = new User()
  user.account.id = accountId
  user.account.username = username
  return await user.save({ validateBeforeSave: true, session })
}

export async function findUserById(accountId: string): Promise<IUser | any> {
  return await User.findById(accountId)
}

export async function findUserUsingAccountId(id: string): Promise<IUser | any> {
  const user = await User.findOne({
    'account.id': id
  })

  return user
}

export async function insertOnePost(userId: string, postId: ObjectId): Promise<UpdateWriteOpResult> {
  return await User.updateOne({ _id: userId }, { $addToSet: { posts: postId } })
}

export async function removeOnePost(userId: string, postId: string): Promise<UpdateWriteOpResult> {
  return await User.updateOne({ _id: userId }, { $pull: { posts: postId } })
}
