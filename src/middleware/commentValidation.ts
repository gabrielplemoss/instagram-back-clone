import { NextFunction, Request, Response } from 'express'
import { badRequest } from '../exception/httpStatusError'
import commentBodyValidation from '../validation/comment'

async function commentValidation(req: Request, res: Response, next: NextFunction) {
  const { comment } = req.body

  try {
    await commentBodyValidation.validate({
      comment
    }, {
      abortEarly: false,
      strict: true,
    })
    next()
  } catch (error) {
    throw badRequest('Campo invalido')
  }
}

export default commentValidation
