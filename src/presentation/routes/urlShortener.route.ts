import { Router } from 'express'
import { container } from 'tsyringe'
import { UrlControllerHttp } from '../../infrastructure/http/controllers/url.controller'

export function urlShortener(app: Router): void {
  const urlControllerHttp = container.resolve(UrlControllerHttp)

  app.post('/shorten', (req, res) => urlControllerHttp.create(req, res))
}
