import appError from './appError'

interface ErroField {
  field: string,
  message: string
}

export default function usernameOrEmailAlreadyExists(fields: string[]) {
  const erros: ErroField[] = []

  fields.forEach((value) => {
    erros.push({
      field: value,
      message: `${value} ja esta sendo usado`
    })
  })

  appError(JSON.stringify(erros), 400, true)
}
