import { inject, injectable } from 'tsyringe'
import { UrlController } from '../../../presentation/controllers/url.controller'
import { Request, Response } from 'express'

@injectable()
export class UrlControllerHttp {
  constructor(
    @inject('UrlController') private readonly urlCOntroller: UrlController
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.urlCOntroller.createShortenUrl(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
