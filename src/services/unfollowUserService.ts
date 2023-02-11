import { findUserById, removeFollowerUser, removeFollowingUser } from '../repositories/userRepository'
import { stringIdToObjectId } from '../utils/stringIdToObjectId'
import { dbTransaction } from '../utils/dbTransaction'
import { notFound } from '../exception/httpStatusError'

export async function unfollowUserService(authUserId: string, userIdToFollow: string) {
  const authObjectId = stringIdToObjectId(authUserId)
  const userFollowingObjectid = stringIdToObjectId(userIdToFollow)

  const userExists = await findUserById(userFollowingObjectid)

  if (!userExists) {
    throw notFound('Usuario não encontrado')
  }

  const unfollow = await dbTransaction(async (session) => {
    const removeFollowing = await removeFollowingUser(authObjectId, userFollowingObjectid, session)
    const removeFollower = await removeFollowerUser(authObjectId, userFollowingObjectid, session)

    if (JSON.stringify(removeFollowing) === JSON.stringify(removeFollower)) {
      return true
    }

    return false
  })

  return unfollow
}
