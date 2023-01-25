export class CustomError {
  public readonly statusCode: number
  public readonly message: any

  constructor(message: string, statusCode = 0) {
    this.message = message
    this.statusCode = statusCode
  }
}
