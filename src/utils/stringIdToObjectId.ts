import mongoose from 'mongoose'

export function stringIdToObjectId(stringId: string) {
  return new mongoose.Types.ObjectId(stringId)
}
