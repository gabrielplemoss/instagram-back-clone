export default function appError(message: string, status: number, isAppError: boolean) {
  const errorObj = {
    status,
    message,
    isAppError
  }

  const jsonError = JSON.stringify(errorObj)

  throw new Error(jsonError)
}
