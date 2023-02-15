import mongoose, { ClientSession, UpdateWriteOpResult } from 'mongoose'
import Comment, { IComment } from '../models/Comment'

type ObjectId = mongoose.Types.ObjectId

export type ICommentWithId = IComment & { _id: ObjectId }

export async function findOneCommentById(commentId: ObjectId): Promise<ICommentWithId | null> {
  return await Comment.findOne({ _id: commentId })
}

export async function saveComment(
  userOwner: ObjectId,
  postId: ObjectId,
  text: string,
  session: ClientSession
): Promise<ICommentWithId> {
  const comment = new Comment({ userOwner, postId, text })
  return await comment.save({ validateBeforeSave: true, session })
}

export async function saveReply(
  userOwner: ObjectId,
  commentParentId: ObjectId,
  text: string,
  session: ClientSession
): Promise<ICommentWithId> {
  const reply = new Comment({ userOwner, commentParentId, text })
  return await reply.save({ validateBeforeSave: true, session })
}

export async function insertReplyInComment(
  commentParentId: ObjectId,
   replyId: ObjectId, 
   session: ClientSession
   ): Promise<UpdateWriteOpResult> {
  return await Comment.updateOne({
    _id: commentParentId
  }, {
    $addToSet: { replies: replyId },
    $inc: { repliesCount: 1 }
  }, { session })
}
