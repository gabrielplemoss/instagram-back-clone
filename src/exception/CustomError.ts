export class CustomError {
  public readonly statusCode: number
  public readonly message: any

  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
