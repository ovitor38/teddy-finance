import 'reflect-metadata'
import app from './index'
import dotenv from 'dotenv'
import { routes } from './presentation/routes'
import '../src/shared/containers'

dotenv.config()

const port = process.env.PORT || 3000

routes(app)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
