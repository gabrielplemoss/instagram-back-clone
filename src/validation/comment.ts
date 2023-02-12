import * as Yup from 'yup'

const schema = Yup.object().shape({
  comment: Yup.string()
    .typeError('Campo obrigatório')
    .required('Campo obrigatório')

})

export default schema
