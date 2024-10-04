import { inject, injectable } from 'tsyringe'
import {
  CreateUserRequestDTO,
  UserResponseDTO
} from '../../presentation/dtos/user/user.dto'
import { hashPassword } from '../../shared/utils/encrypter'
import { IUserRepository } from '../../enterprise/repositories/user.repository'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async create(userDto: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const passwordHashed = hashPassword(userDto.password)

    const userData = {
      name: userDto.name,
      email: userDto.email,
      passwordHashed
    }

    const user = await this.userRepository.save(userData)

    return user
  }
}
