import { createAccount, findByUsernameOrEmail } from '../repositories/accountsRepository'
import { hash } from 'bcryptjs'
import usernameOrEmailAlreadyExists from '../exception/usernameOrEmailAlreadyExists'

interface RequestBody {
  username: string,
  email: string,
  password: string
}

export async function createAccountService({ username, email, password }: RequestBody) {
  const accountsFound = await findByUsernameOrEmail(username, email)

  if (accountsFound.length > 0) {
    const equalFields: string[] = []

    accountsFound.forEach((value => {
      if (value.username === username) equalFields.push('username')
      if (value.email === email) equalFields.push('email')
    }))

    usernameOrEmailAlreadyExists(equalFields)
  }

  const hashedPassword = await hash(password, 12)
  const newAccount = createAccount({ username, email, password: hashedPassword })
  const createdAccount = await newAccount.save({ validateBeforeSave: true })

  return createdAccount
}
