import { Request, Response } from 'express'
import { UserController } from '../../../presentation/controllers/user.controller'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UserControllerHttp {
  constructor(
    @inject('UserController') private readonly userController: UserController
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.userController.createUser(req.body)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}
