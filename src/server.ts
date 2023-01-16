import express from 'express'
import * as dotenv from 'dotenv'
import routes from './router'
import dbConnection from './config/dbConnection'

const app = express()

dotenv.config()
dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen('3333', () => {
  console.log('server running PORT 3333')
})
