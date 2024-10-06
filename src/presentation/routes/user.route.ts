import { Router } from 'express'
import { container } from 'tsyringe'
import { UserHttpAdapter } from '../../infrastructure/http/adapters/user.adapter'

export function userRoutes(app: Router): void {
  const userHttpAdapter = container.resolve(UserHttpAdapter)

  app.post('/api/user', (req, res, next) => userHttpAdapter.create(req, res, next))
}
