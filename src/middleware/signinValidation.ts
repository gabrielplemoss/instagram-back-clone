import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import formValidationException from '../exception/formValidationException'
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
    formValidationException(error as ValidationError)
  }
}

export default signinValidation 
