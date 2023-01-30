import mongoose from 'mongoose'

interface IUser {
  account: {
    id: mongoose.Types.ObjectId,
    username: String
  }
  posts: mongoose.Types.ObjectId[]
  follower: mongoose.Types.ObjectId[]
  followers: mongoose.Types.ObjectId[]
  avatar: string
  isPrivate: false
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({
  account: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      require: true
    }
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  follower: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  avatar: {
    type: String,
    default: '1675d7e4-cd73-4d78-a522-e4f71cba88e5.png'
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const User = mongoose.model<IUser>('User', UserSchema)

export { IUser }
export default User
