import { Router } from 'express'
import { container } from 'tsyringe'
import { UrlControllerHttp } from '../../infrastructure/http/adapters/url.adapter'

export function url(app: Router): void {
  const urlControllerHttp = container.resolve(UrlControllerHttp)

  app.post('/api/url/shorten', (req, res, next) =>
    urlControllerHttp.create(req, res, next)
  )
  app.get('/:id', (req, res, next) =>
    urlControllerHttp.redirectUrl(req, res, next)
  )
}
