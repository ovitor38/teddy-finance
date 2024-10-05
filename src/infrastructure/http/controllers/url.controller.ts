import { inject, injectable } from 'tsyringe'
import { UrlController } from '../../../presentation/controllers/url.controller'
import { Request, Response } from 'express'

@injectable()
export class UrlControllerHttp {
  constructor(
    @inject('UrlController') private readonly urlController: UrlController
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.urlController.createShortenUrl(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  async redirectUrl(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.urlController.redirect(req)
      return res.redirect(`http://${result.data}`)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
