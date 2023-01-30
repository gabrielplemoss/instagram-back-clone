import mongoose from 'mongoose'

interface IComment {
  userOwner: mongoose.Types.ObjectId
  postId: mongoose.Types.ObjectId
  replies: mongoose.Types.ObjectId[]
  text: string
  likes: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new mongoose.Schema<IComment>({
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})

const Comment = mongoose.model<IComment>('Comment', CommentSchema)

export { IComment }
export default Comment
