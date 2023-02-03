import mongoose, { ClientSession } from 'mongoose'

type TransactionCallback = (session: ClientSession) => Promise<any>

export async function dbTransaction(transactionCallback: TransactionCallback) {
  const session = await mongoose.startSession()
  let result

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
