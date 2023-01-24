import * as Yup from 'yup'

const usernameRegex = /^([a-zA-Z0-9.]+_+){0,1}([a-zA-Z0-9])+$/g

const schema = Yup.object().shape({
  username: Yup.string()
    .matches(usernameRegex, 'nome de usuario invalido')
    .typeError('nome de usuario invalido')
    .required('nome de usuario obrigatorio'),

  email: Yup.string()
    .email('email invalido')
    .typeError('email invalido')
    .required('email é obrigatorio'),
    
  password: Yup.string()
    .min(8, 'minimo 8 digitos')
    .max(20, 'maximo 20 digitos')
    .typeError('senha invalida')
    .required('senha obrigatorio'),

})

export default schema
