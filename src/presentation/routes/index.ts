import { Router } from 'express'
import { userRoutes } from './user.route'
import { authRoutes } from './auth.route'
import { urlShortener } from './urlShortener.route'

const router = Router()

export function routes(app: Router): void {
  userRoutes(router)
  authRoutes(router)
  urlShortener(router)

  app.use(router)
}
