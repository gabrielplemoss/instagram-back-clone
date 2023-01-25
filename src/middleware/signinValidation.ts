import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { FormValidationError } from '../exception/FormValidationError'
import formValidation from '../validation/signin'

async function signinValidation(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body

  try {
    await formValidation.validate({
      username,
      password
    }, {
      abortEarly: false,
      strict: true,
    })

    next()
  } catch (error) {
    throw new FormValidationError(error as ValidationError)
  }
}

export default signinValidation 
