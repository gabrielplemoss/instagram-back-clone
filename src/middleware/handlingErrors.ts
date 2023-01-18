import { Request, Response, NextFunction } from 'express'
import { ErrorObj } from '../exception/appError'

export default function handlingErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.message.includes('status')) {
    const erroObj: ErrorObj = JSON.parse(err.message)
    return res.status(erroObj.status)
      .json({ error: JSON.parse(erroObj.message) })
      .end()
  }

  return res.status(500)
    .json({ error: 'Internal server error' })
    .end()
}
