import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/user.repository'
import {
  CreateUserRequestDTO,
  UserResponseDTO
} from '../../presentation/dtos/user/user.dto'
import { hashPassword } from '../../shared/utils/encrypter'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async create(userDto: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const passwordHashed = hashPassword(userDto.password)

    const userData = {
      ...userDto,
      password: passwordHashed
    }

    const user = await this.userRepository.save(userData)

    return user
  }
}
