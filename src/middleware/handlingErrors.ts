import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../exception/CustomError'

export default function handlingErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (error instanceof CustomError) {
    return res.status(error.statusCode)
      .json({ error: error.message })
      .end()
  }

  return res.status(500)
    .json({ error: 'Internal server error' })
    .end()
}
