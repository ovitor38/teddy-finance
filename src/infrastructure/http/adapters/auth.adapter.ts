import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { IAuthController } from '../../../presentation/controllers/interfaces/auth.interface'

@injectable()
export class AuthControllerHttp {
  constructor(
    @inject('AuthController') private readonly authController: IAuthController
  ) {}

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const result = await this.authController.login(req.body)
      return res.status(result.statusCode).json(result.data)
    } catch (error: any) {
      next(error.error)
    }
  }
}
