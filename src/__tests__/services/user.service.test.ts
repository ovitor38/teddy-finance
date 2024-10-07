import 'reflect-metadata'
import { UserService } from '../../application/services/user.service'
import { IUserRepository } from '../../enterprise/repositories/user.repository'
import {
  CreateUserRequestDTO,
  UserResponseDTO
} from '../../presentation/dtos/user.dto'
import { hashPassword } from '../../shared/utils/encrypter'
import { User } from '../../enterprise/entities/user/user.entity'
import { IUSerService } from '../../application/interfaces/user.interface'
import { container } from 'tsyringe'

const mockUserRepository: jest.Mocked<IUserRepository> = {
  save: jest.fn(),
  findByEmail: jest.fn()
} as any

jest.mock('../../shared/utils/encrypter', () => ({
  hashPassword: jest.fn()
}))

describe('UserService', () => {
  let userService: IUSerService

  beforeEach(() => {
    container.registerInstance<IUserRepository>(
      'UserRepository',
      mockUserRepository
    )

    userService = container.resolve(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('create', () => {
    it('should hash the user password and save the user', async () => {
      const userDto: CreateUserRequestDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      }

      const hashedPassword = 'hashedPassword123'

      const expectedUser: UserResponseDTO = {
        id: 'user-id-123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      ;(hashPassword as jest.Mock).mockResolvedValue(hashedPassword)
      mockUserRepository.save.mockResolvedValue(expectedUser)

      const result = await userService.create(userDto)

      expect(hashPassword).toHaveBeenCalledWith(userDto.password)
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        name: userDto.name,
        email: userDto.email,
        passwordHashed: hashedPassword
      })
      expect(result).toEqual(expectedUser)
    })
  })

  describe('findByEmail', () => {
    it('should return a user when a user is found by email', async () => {
      const email = 'john.doe@example.com'

      const expectedUser: User = {
        id: 'user-id-123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHashed: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockUserRepository.findByEmail.mockResolvedValue(expectedUser)

      const result = await userService.findByEmail(email)

      expect(result).toEqual(expectedUser)
      expect(result?.email).toEqual(email)
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email)
    })

    it('should return null when no user is found by email', async () => {
      const email = 'nonexistent@example.com'
      mockUserRepository.findByEmail.mockResolvedValue(null)

      const result = await userService.findByEmail(email)

      expect(result).toBeNull()
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email)
    })
  })
})
