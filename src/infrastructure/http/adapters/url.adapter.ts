import { inject, injectable } from 'tsyringe'
import { UrlController } from '../../../presentation/controllers/url.controller'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'

@injectable()
export class UrlControllerHttp {
  constructor(
    @inject('UrlController') private readonly urlController: UrlController
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.urlController.createShortenUrl(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error: any) {
      next(error.error)
    }
  }

  async redirectUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.urlController.redirect(req)
      return res.redirect(`http://${result.data}`)
    } catch (error: any) {
      next(error.error)
    }
  }
}
