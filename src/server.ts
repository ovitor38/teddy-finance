import 'reflect-metadata'
import dotenv from 'dotenv'
import './shared/containers'

import app from './index'
import { routes } from './presentation/routes'
import { errorMiddleware } from './middlewares/error.middleware'

dotenv.config()

const port = process.env.PORT || 3000

routes(app)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
