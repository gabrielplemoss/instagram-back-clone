import mongoose from 'mongoose'

interface IAccount {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const AccountSchema = new mongoose.Schema<IAccount>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Account = mongoose.model<IAccount>('Account', AccountSchema)

export { IAccount }
export default Account
