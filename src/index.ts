import express from 'express'
import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger'


dotenv.config()

const app = express()



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cors())
app.use(express.json())

export default app
