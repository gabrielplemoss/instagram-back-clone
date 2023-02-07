import mongoose, { ClientSession } from 'mongoose'

type TransactionCallback<T> = (session: ClientSession) => Promise<T>

export async function dbTransaction<T>(transactionCallback: TransactionCallback<T>): Promise<T | null> {
  const session = await mongoose.startSession()
  let result: any

  await session.withTransaction(async (session) => {
    try {
      result = await transactionCallback(session)
      await session.commitTransaction()
    } catch (error) {
      result = null
      await session.abortTransaction()
    } finally {
      await session.endSession()
    }

    return result
  })

  return result
}
