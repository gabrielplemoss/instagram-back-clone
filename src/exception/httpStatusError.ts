import { CustomError } from './CustomError'

export function badRequest(message: string) {
  return new CustomError(message, 400)
}

export function unauthorized(message: string) {
  return new CustomError(message, 401)
}

export function notFound(message: string) {
  return new CustomError(message, 404)
}

export function serverError(message: string) {
  return new CustomError(message, 500)
}
