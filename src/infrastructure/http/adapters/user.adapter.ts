import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { IUserController } from '../../../presentation/controllers/interfaces/user.interface'

@injectable()
export class UserHttpAdapter {
  constructor(
    @inject('UserController') private readonly userController: IUserController
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const result = await this.userController.createUser(req)
      return res.status(result.statusCode).json(result.data)
    } catch (error: any) {
      next(error.error)
    }
  }
}
