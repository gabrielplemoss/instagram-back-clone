import { saveAccount, findUsingUsernameAndEmail } from '../repositories/accountsRepository'
import { hash } from 'bcryptjs'
import { UsernameOrEmailInUse } from '../exception/UsernameOrEmailInUse'
import { dbTransaction } from '../utils/dbTransaction'
import { saveUser } from '../repositories/userRepository'

interface RequestBody {
  username: string,
  email: string,
  password: string
}

export async function createAccountService({ username, email, password }: RequestBody) {
  const accountsFound = await findUsingUsernameAndEmail(username, email)

  if (accountsFound.length > 0) {
    const equalFields: string[] = []

    accountsFound.forEach((value => {
      if (value.username === username) equalFields.push('username')
      if (value.email === email) equalFields.push('email')
    }))

    throw new UsernameOrEmailInUse(equalFields)
  }

  const hashedPassword = await hash(password, 12)

  const newUser = await dbTransaction(async (session) => {
    const createdAccount = await saveAccount({
      username,
      email,
      password: hashedPassword
    }, session)

    const createdUser = await saveUser(
      createdAccount._id,
      createdAccount.username,
      session
    )

    return {
      id: createdUser._id,
      username: createdUser.account.username
    }
  })

  return newUser
}
