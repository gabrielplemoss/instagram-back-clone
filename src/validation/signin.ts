import * as Yup from 'yup'

const userRegex = /^[a-zA-Z0-9_@.]+$/g

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(userRegex, 'usuario/email invalido')
    .typeError('usuario/email invalido')
    .required('usuario/email obrigatório'),

  password: Yup.string()
    .min(8, 'minimo 8 digitos')
    .max(20, 'maximo 20 digitos')
    .typeError('senha invalida')
    .required('senha obrigatória'),

})

export default schema
