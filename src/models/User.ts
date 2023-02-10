import mongoose from 'mongoose'

interface IUser {
  account: {
    id: mongoose.Types.ObjectId,
    username: String
  }
  posts: mongoose.Types.ObjectId[]
  following: mongoose.Types.ObjectId[]
  followers: mongoose.Types.ObjectId[]
  postsCount: number
  followingCount: number
  followersCount: number
  avatar: string
  isPrivate: false
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({
  account: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    }
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  postsCount: {
    type: Number,
    default: 0
  },
  followingCount: {
    type: Number,
    default: 0
  },
  followersCount: {
    type: Number,
    default: 0
  },
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
