import { Router } from 'express'
import { userRoutes } from './user.route'
import { authRoutes } from './auth.route'
import { url } from './url.route'

const router = Router()

export function routes(app: Router): void {
  userRoutes(router)
  authRoutes(router)
  url(router)

  app.use(router)
}
