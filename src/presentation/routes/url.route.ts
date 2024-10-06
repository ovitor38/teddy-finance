import { Router } from 'express'
import { container } from 'tsyringe'
import { UrlControllerHttp } from '../../infrastructure/http/adapters/url.adapter'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

export function url(app: Router): void {
  const urlAdpterHttp = container.resolve(UrlControllerHttp)
  const authMiddleware = container.resolve(AuthMiddleware)

  app.post('/api/url/shorten', (req, res, next) =>
    urlAdpterHttp.create(req, res, next)
  )
  app.get('/:id', (req, res, next) => urlAdpterHttp.redirectUrl(req, res, next))

  app.get(
    '/api/url',
    (req, res, next) => authMiddleware.handle(req, res, next),
    (req, res, next) => urlAdpterHttp.getAll(req, res, next)
  )

  app.patch(
    '/api/url/:id',
    (req, res, next) => authMiddleware.handle(req, res, next),
    (req, res, next) => urlAdpterHttp.update(req, res, next)
  )

  app.delete(
    '/api/url/:id',
    (req, res, next) => authMiddleware.handle(req, res, next),
    (req, res, next) => urlAdpterHttp.delete(req, res, next)
  )
}
