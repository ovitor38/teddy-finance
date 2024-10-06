import { NextFunction, Request, Response } from 'express'
import { UserController } from '../../../presentation/controllers/user.controller'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UserHttpAdapter {
  constructor(
    @inject('UserController') private readonly userController: UserController
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
