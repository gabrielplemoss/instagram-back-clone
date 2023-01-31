import mongoose, { PopulateOptions } from 'mongoose'
import Post, { IPost } from '../models/Post'

type ObjectId = mongoose.Types.ObjectId

interface NewPost {
  userOwner: string
  description: string
  photos: string[]
}

type PostWithId = IPost & { _id: ObjectId }

export async function savePost({ userOwner, description, photos }: NewPost): Promise<PostWithId | any> {
  const post = new Post({
    userOwner: userOwner,
    description: description,
    photos: photos
  })
  return await post.save({ validateBeforeSave: true })
}

export async function findPostById(id: string): Promise<PostWithId | null> {
  return await Post.findById(id).populate({
    path: 'userOwner',
    transform: (doc, id) => doc.account.username
  })
}

export async function deletePost(userId: string, postId: string) {
  return await Post.deleteOne({
    $and: [
      { _id: postId },
      { userOwner: userId }
    ]
  })
}
