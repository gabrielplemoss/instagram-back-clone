import { CustomError } from './CustomError'

interface FieldErro {
  field: string
  message: string
}

export class UsernameOrEmailInUse extends CustomError {
  public message: FieldErro[]
  public statusCode: number

  constructor(fields: string[], message = [], statusCode = 400) {
    super('username/email in use')
    this.statusCode = statusCode
    this.message = message
    this.fieldsWithErro(fields)
  }


  private fieldsWithErro(fields: string[]) {
    this.message = fields.map((field) => {
      return {
        field,
        message: `${field} ja esta sendo usado`
      }
    })
  }
}