import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import formValidation from '../validation/signup'
import { CustomValidationError } from '../exception/CustomValidationError'

async function signupValidation(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body

  try {
    await formValidation.validate({
      username,
      email,
      password
    }, {
      abortEarly: false,
      strict: true,
    })

    next()
  } catch (error) {
    throw new CustomValidationError(error as ValidationError)
  }
}

export default signupValidation 
