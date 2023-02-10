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

export async function findUserByName(username: string): Promise<IUserWithId | null> {
  return await User.findOne({ 'account.username': username })
}

export async function findUserUsingAccountId(accountId: ObjectId): Promise<IUserWithId | null> {
  return await User.findOne({ 'account.id': accountId })
}

export async function insertOnePostInUser(
  userId: ObjectId,
  postId: ObjectId,
  session: ClientSession
): Promise<UpdateWriteOpResult> {
  return await User.updateOne({
    $and: [
      { _id: userId },
      { posts: { $in: [postId] } }
    ]
  }, {
    $addToSet: { posts: postId },
    $inc: { postsCount: 1 }
  }, { session })
}

export async function removeOnePostInUser(
  userId: ObjectId,
  postId: ObjectId,
  session: ClientSession
): Promise<UpdateWriteOpResult> {
  return await User.updateOne({
    $and: [
      { _id: userId },
      { posts: { $in: [postId] } }
    ]
  }, {
    $pull: { posts: postId },
    $inc: { postsCount: -1 }
  }, { session })
}
