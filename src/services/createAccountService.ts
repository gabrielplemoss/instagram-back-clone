import { createAccount, findUsingUsernameAndEmail } from '../repositories/accountsRepository'
import { hash } from 'bcryptjs'
import { UsernameOrEmailInUse } from '../exception/UsernameOrEmailInUse'

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
  const createdAccount = createAccount({ username, email, password: hashedPassword })

  return createdAccount
}
