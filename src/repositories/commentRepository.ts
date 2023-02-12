import mongoose, { ClientSession } from 'mongoose'
import Comment, { IComment } from '../models/Comment'

type ObjectId = mongoose.Types.ObjectId

type ICommentWithId = IComment & { _id: ObjectId }

export async function saveComment(
  userOwner: ObjectId,
  postId: ObjectId,
  text: string,
  session: ClientSession
): Promise<ICommentWithId> {
  const comment = new Comment({ userOwner, postId, text })
  return await comment.save({ validateBeforeSave: true, session })
}
