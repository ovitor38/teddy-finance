import { Router } from 'express'
import { container } from 'tsyringe'
import { AuthControllerHttp } from '../../infrastructure/http/adapters/auth.adapter'

export function authRoutes(app: Router): void {
  const authController = container.resolve(AuthControllerHttp)

  app.post('/api/auth/login', (req, res, next) =>
    authController.login(req, res, next)
  )
}
