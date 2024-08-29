import { User } from '../entities/user/user.entity'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
  update(user: User): Promise<void>
}
