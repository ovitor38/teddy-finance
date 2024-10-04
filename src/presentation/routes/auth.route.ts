import { Router } from 'express'
import { container } from 'tsyringe'
import { AuthControllerHttp } from '../../infrastructure/http/controllers/auth.controller'

export function authRoutes(app: Router): void {
  const authController = container.resolve(AuthControllerHttp)

  app.post('/login', (req, res) => authController.login(req, res))
}
