import { Request, Response, NextFunction } from 'express'
import { CustomValidationError } from '../exception/CustomValidationError'
import post from '../validation/post'

export async function postFieldsValidation(req: Request, res: Response, next: NextFunction) {
  const { text } = req.body
  const photos = req.files

  try {
    await post.validate({
      text,
      photos
    }, {
      abortEarly: false
    })
    next()
  } catch (error: any) {
    throw new CustomValidationError(error)
  }
}
