import { addFollowerUser, addFollowingUser, findUserById, } from '../repositories/userRepository'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { dbTransaction } from '../utils/dbTransaction'
import { notFound } from '../exception/httpStatusError'

export async function followUserService(authUserId: string, iserIdToFollow: string) {
  const authObjectId = stringIdToObjectId(authUserId)
  const userFollowingObjectid = stringIdToObjectId(iserIdToFollow)

  const userExists = await findUserById(userFollowingObjectid)

  if (!userExists) {
    throw notFound('Usuario não encontrado')
  }

  const follow = await dbTransaction(async (session) => {
    const addFollowing = await addFollowingUser(authObjectId, userFollowingObjectid, session)
    const addFollower = await addFollowerUser(authObjectId, userFollowingObjectid, session)

    if (JSON.stringify(addFollowing) === JSON.stringify(addFollower)) {
      return true
    }

    return false
  })

  return follow
}
