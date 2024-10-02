import express from 'express'
import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

export default app
