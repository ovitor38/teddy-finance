import { inject, injectable } from 'tsyringe'
import { CreateUserRequestDTO } from '../dtos/user/user.dto'
import { UserService } from '../../application/services/user.service'

@injectable()
export class UserController {
  constructor(
    @inject('UserService')
    private readonly userService: UserService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createUser(request: any) {
    try {
      //TODO: VALIDATE DTO WITH ZOD
      // if (!requestIsValid) {
      // throw new Error('Not Valid Request')
      // }
      const createUserDto: CreateUserRequestDTO = {
        name: request.name,
        email: request.email,
        password: request.password
      }

      const user = await this.userService.create(createUserDto)
      return { statusCode: 201, data: user }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return { statusCode: 400, data: { messageError: error.message } }
    }
  }
}
