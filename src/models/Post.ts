import mongoose from 'mongoose'

interface IPost {
  userOwner: mongoose.Types.ObjectId
  description: string
  photos: string[]
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  commentsCount: number
  likesCount: number
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new mongoose.Schema<IPost>({
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Post = mongoose.model<IPost>('Post', PostSchema)

export { IPost }
export default Post
