import { UserResponseDTO } from '../../presentation/dtos/user/user.dto'
import { User } from '../entities/user/user.entity'

export interface IUserRepository {
  findById(id: string): Promise<UserResponseDTO | null>
  save(
    user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserResponseDTO>
  update(id: string, user: User): Promise<UserResponseDTO | null>
  findByEmail(email: string): Promise<User | null>
}
