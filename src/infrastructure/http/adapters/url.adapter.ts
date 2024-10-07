import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { IUrlController } from '../../../presentation/controllers/interfaces/url.interface'

@injectable()
export class UrlControllerHttp {
  constructor(
    @inject('UrlController') private readonly urlController: IUrlController
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
  ): Promise<void | undefined> {
    try {
      const result = await this.urlController.redirect(req)
      if (result.data) {
        res.redirect(`${result.data}`)
      }
    } catch (error: any) {
      next(error.error)
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.urlController.getAll(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error: any) {
      next(error.error)
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.urlController.update(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error:any) {
      next(error.error)
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.urlController.delete(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error:any) {
      next(error.error)
    }
  }
}
