import { Request, Response } from 'express'
import { CustomError } from '../exception/CustomError'
import { findUserByName } from '../repositories/userRepository'

interface ReqParams {
  username: string
}

export async function getUser(req: Request<ReqParams>, res: Response) {
  const { username } = req.params
  const user = await findUserByName(username)

  if (!user) {
    throw new CustomError('Pagina não encontrada', 404)
  }

  res.status(200).json({ user }).end()
}
