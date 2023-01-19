import { ValidationError } from 'yup'
import appError from './appError'

function formValidationException(validationError: ValidationError) {
  const erroInner = validationError.inner

  const errors = erroInner.map((erro) => {
    return {
      field: erro.path,
      message:  erro.message
    }
  })

  appError(JSON.stringify(errors), 422, true)
}

export default formValidationException
