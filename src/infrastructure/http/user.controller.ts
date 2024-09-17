// infra/http/controllers/UserControllerInfra.ts
import { Request, Response } from 'express'
import { UserController } from '../../presentation/controllers/user.controller'

export class UserControllerHttp {
  private readonly userController: UserController

  constructor(userController: UserController) {
    this.userController = userController
  }

  // Método que lida com a requisição HTTP e delega para o controller de apresentação
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      // Extrai os dados do request e passa para o controller da camada de apresentação
      const result = await this.userController.createUser(req.body)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      // Tratamento de erros específicos da camada de infraestrutura
      return res.status(500).json({ message: error })
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id
      const result = await this.userController.getUserById(userId)
      return res.status(result.statusCode).json(result.data)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}
