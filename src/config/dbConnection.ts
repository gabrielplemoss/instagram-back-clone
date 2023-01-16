import moongoose from 'mongoose'

export default async function connection() {
  await moongoose
    .set({ strictQuery: true })
    .connect(`${process.env.URL_DB}`)
    .catch((error) => {
      console.log(error)
    })
}
