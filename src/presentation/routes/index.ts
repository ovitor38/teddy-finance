import { Router } from 'express'
import { userRoutes } from './user.route'

const router = Router()

export function routes(app: Router): void {
  userRoutes(router)

  app.use(router)
}
