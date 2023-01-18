export interface ErrorObj {
  status: number,
  message: string,
  isAppError: boolean
}

export default function appError(message: string, status: number, isAppError: boolean) {
  const errorObj: ErrorObj = {
    status,
    message,
    isAppError
  }

  const jsonError = JSON.stringify(errorObj)

  throw new Error(jsonError)
}
