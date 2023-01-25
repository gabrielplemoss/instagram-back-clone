import mongoose from 'mongoose'

interface IAccount {
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
}

const AccountSchema = new mongoose.Schema<IAccount>({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true
  },
  password: { type: String }
}, {
  timestamps: true
})

const Account = mongoose.model<IAccount>('Account', AccountSchema)

export { IAccount }
export default Account
