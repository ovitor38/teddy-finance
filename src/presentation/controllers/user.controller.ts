// presentation/controllers/UserControllerPresentation.ts
import { UserResponseDTO } from '../dto/UserResponseDTO'
import { CreateUserDTO } from '../dtos/user/crete-user.dto'

export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  async createUser(request: HttpRequest) {
    try {
      //TODO: VALIDATE DTO WITH ZOD
      if (!requestIsValid) {
        throw new Error('Not Valid Reques')
      }
      const createUserDto: CreateUserDTO = {
        name: request.name,
        email: request.email,
        password: request.password
      }

      const user = await this.createUserService.execute(createUserDto)
      const responseDTO = new UserResponseDTO(user)
      return { statusCode: 201, data: responseDTO }
    } catch (error) {
      return { statusCode: 400, data: { message: error.message } }
    }
  }
}
