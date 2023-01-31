import * as Yup from 'yup'

const schema = Yup.object().shape({
  text: Yup.string()
    .typeError('Campo obrigatório')
    .required('Campo obrigatório'),

  photos: Yup.array()
    .min(1, 'Minimo 1 foto')
    .max(10, 'maximo 10 foto')

})

export default schema
