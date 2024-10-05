import { inject, injectable } from 'tsyringe'
import {
  CreateUserRequestDTO,
  UserResponseDTO
} from '../../presentation/dtos/user.dto'
import { hashPassword } from '../../shared/utils/encrypter'
import { IUserRepository } from '../../enterprise/repositories/user.repository'
import { User } from '../../enterprise/entities/user/user.entity'

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async create(userDto: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const passwordHashed = await hashPassword(userDto.password)

    const userData = {
      name: userDto.name,
      email: userDto.email,
      passwordHashed
    }

    const user = await this.userRepository.save(userData)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email)

    return user
  }
}
