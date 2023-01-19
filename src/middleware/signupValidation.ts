import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import formValidationException from '../exception/formValidationException'
import formValidation from '../validation/signup'

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
    formValidationException(error as ValidationError)
  }
}

export default signupValidation 
