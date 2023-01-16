import express from 'express'
import * as dotenv from 'dotenv'
import routes from './router'

const app = express()

dotenv.config()

app.use(routes)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen('3333', () => {
  console.log('server running PORT 3333')
})
