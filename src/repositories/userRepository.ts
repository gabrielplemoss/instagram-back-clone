import mongoose, { ClientSession, UpdateWriteOpResult } from 'mongoose'
import User, { IUser } from '../models/User'

type ObjectId = mongoose.Types.ObjectId
type IUserWithId = IUser & { _id: ObjectId }

export async function saveUser(id: ObjectId, username: String,
  session: ClientSession
): Promise<IUserWithId> {
  const user = new User({
    account: { id, username }
  })
  return await user.save({ validateBeforeSave: true, session })
}

export async function findUserById(accountId: ObjectId): Promise<IUserWithId | null> {
  return await User.findById(accountId)
}

export async function findUserUsingAccountId(accountId: ObjectId): Promise<IUserWithId | null> {
  const user = await User.findOne({
    'account.id': accountId
  })

  return user
}

export async function insertOnePostInUser(
  userId: ObjectId,
  postId: ObjectId,
  session: ClientSession
): Promise<UpdateWriteOpResult> {
  return await User.updateOne({ _id: userId }, { $addToSet: { posts: postId } }, { session })
}

export async function removeOnePost(userId: ObjectId, postId: ObjectId): Promise<UpdateWriteOpResult> {
  return await User.updateOne({ _id: userId }, { $pull: { posts: postId } })
}
