import mongoose from 'mongoose'
import { CustomError } from '../exception/CustomError'
import * as postRepository from '../repositories/postRepository'
import * as userRepository from '../repositories/userRepository'

export async function deletePostService(userId: string, postId: string) {
  const postExists = await postRepository.findPostById(new mongoose.Types.ObjectId(postId))

  if (!postExists)
    throw new CustomError('Postagem não encontrada', 404)

  const userPost = await userRepository.removeOnePost(
    new mongoose.Types.ObjectId(userId),
    new mongoose.Types.ObjectId(postId)
  )

  if (userPost.modifiedCount === 0)
    throw new Error()

  const postDeleted = await postRepository.deletePost(
    new mongoose.Types.ObjectId(userId),
    new mongoose.Types.ObjectId(postId)
  )

  if (postDeleted.deletedCount === 0)
    throw new Error()
}
