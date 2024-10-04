import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { AuthController } from '../../../presentation/controllers/auth.controller'

@injectable()
export class AuthControllerHttp {
  constructor(
    @inject('AuthController') private readonly authController: AuthController
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.authController.login(req.body)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
