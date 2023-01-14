import express from 'express'
import * as dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen('3333', ()=>{
  console.log('server running PORT 3333')
})

