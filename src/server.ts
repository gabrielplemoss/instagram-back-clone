import express from 'express'
import 'express-async-errors'
import * as dotenv from 'dotenv'
import routes from './router'
import dbConnection from './config/dbConnection'
import handlingErrors from './middleware/handlingErrors'

const app = express()

dotenv.config()
dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(handlingErrors)

app.listen('3333', () => {
  console.log('server running PORT 3333')
})
