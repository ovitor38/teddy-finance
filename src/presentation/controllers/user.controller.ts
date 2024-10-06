import { inject, injectable } from 'tsyringe'
import { CreateUserRequestDTO, UserResponseDTO } from '../dtos/user.dto'
import { IUSerService } from '../../application/interfaces/user.interface'
import { HttpRequest } from './types/http.type'
import { IHttpResponse } from '../dtos/http.dto'
import { IErrorResponse } from '../../shared/errors/error.response'
import { IUserController } from './interfaces/user.interface'

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject('UserService')
    private readonly userService: IUSerService
  ) {}

  async createUser(
    request: HttpRequest
  ): Promise<IHttpResponse<UserResponseDTO | IErrorResponse>> {
    try {
      //TODO: VALIDATE DTO WITH ZOD
      // if (!requestIsValid) {
      // throw new Error('Not Valid Request')
      // }
      const createUserDto: CreateUserRequestDTO = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      }

      const user = await this.userService.create(createUserDto)
      return { statusCode: 201, data: user }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }
}
