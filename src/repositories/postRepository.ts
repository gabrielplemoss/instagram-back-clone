import mongoose, { ClientSession } from 'mongoose'
import Post, { IPost } from '../models/Post'

type ObjectId = mongoose.Types.ObjectId

interface NewPost {
  userOwner: string
  description: string
  photos: string[]
}

export type PostWithId = IPost & { _id: ObjectId }

export async function savePost(
  { userOwner, description, photos }: NewPost,
  session: ClientSession
): Promise<PostWithId> {
  const post = new Post({
    userOwner: userOwner,
    description: description,
    photos: photos
  })
  return await post.save({ validateBeforeSave: true, session })
}

export async function findPostById(id: ObjectId, session?: ClientSession): Promise<PostWithId | null> {
  return await Post.findById(id, null, { session }).populate({
    path: 'userOwner',
    transform: (doc, id) => doc.account.username
  })
}

export async function deletePost(userId: ObjectId, postId: ObjectId, session: ClientSession) {
  return await Post.deleteOne({
    $and: [
      { _id: postId },
      { userOwner: userId }
    ]
  }, { session })
}
