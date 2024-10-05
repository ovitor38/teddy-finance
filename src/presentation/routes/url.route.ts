import { Router } from 'express'
import { container } from 'tsyringe'
import { UrlControllerHttp } from '../../infrastructure/http/controllers/url.controller'

export function url(app: Router): void {
  const urlControllerHttp = container.resolve(UrlControllerHttp)

  app.post('/api/url/shorten', (req, res) => urlControllerHttp.create(req, res))
  app.get("/:id", (req, res) => urlControllerHttp.redirectUrl(req, res))
}
