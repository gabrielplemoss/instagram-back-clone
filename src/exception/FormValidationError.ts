import { ValidationError } from 'yup'
import { CustomError } from './CustomError'

interface FieldErro {
  field: string
  message: string
}

export class FormValidationError extends CustomError {
  public statusCode: number
  public message: FieldErro[]

  constructor(validationError: ValidationError, statusCode = 400) {
    super('Validation Error')
    this.statusCode = statusCode
    this.message = []
    this.fieldsWithErro(validationError)
  }

  private fieldsWithErro(validationError: ValidationError) {
    const erroInner = validationError.inner

    this.message = erroInner.map((erro) => {
      return {
        field: erro.path,
        message: erro.message
      } as FieldErro
    })
  }
}
