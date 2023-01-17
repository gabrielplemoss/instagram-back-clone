import Account from '../models/Account'

interface IAccount {
  username: string,
  email: string,
  password: string
}

export function createAccount({ username, email, password }: IAccount) {
  return new Account({ username, email, password })
}
