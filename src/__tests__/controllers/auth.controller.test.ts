import 'reflect-metadata'
import { AuthController } from '../../presentation/controllers/auth.controller'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { LoginRequestDto } from '../../presentation/dtos/auth.dto'
import { IHttpResponse } from '../../presentation/dtos/http.dto'
import { verifyPassword } from '../../shared/utils/encrypter'
import { container } from 'tsyringe'
import { IUSerService } from '../../application/interfaces/user.interface'
import { User } from '../../enterprise/entities/user/user.entity'
import { IAuthController } from '../../presentation/controllers/interfaces/auth.interface'

const mockAuthService: jest.Mocked<IAuthService> = {
  verifyToken: jest.fn(),
  generateToken: jest.fn()
}

const mockUserService: jest.Mocked<IUSerService> = {
  create: jest.fn(),
  findByEmail: jest.fn()
}

jest.mock('../../shared/utils/encrypter', () => ({
    verifyPassword: jest.fn(),
  }));

let authController: IAuthController

beforeEach(() => {
  container.registerInstance<IUSerService>('UserService', mockUserService)
  container.registerInstance<IAuthService>('AuthService', mockAuthService)

  authController = container.resolve(AuthController)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('AuthController', () => {
  describe('login', () => {
    it('should return 400 if email or password is missing', async () => {
      const loginDto: LoginRequestDto = {
        email: '',
        password: ''
      }

      await expect(authController.login(loginDto)).rejects.toEqual({
        error: { statusCode: 400, message: 'Email and password are required' }
      })
    })

    it('should return 401 if user is not found', async () => {
      const loginDto: LoginRequestDto = {
        email: 'user@example.com',
        password: 'password123'
      }

      mockUserService.findByEmail.mockResolvedValue(null)

      await expect(authController.login(loginDto)).rejects.toEqual({
        error: { message: 'Invalid email or password', statusCode: 401 }
      })
    })

    it('should return 401 if password is incorrect', async () => {
      const loginDto: LoginRequestDto = {
        email: 'user@example.com',
        password: 'password123'
      }

      const mockUser: User = {
        id: 'user-id-123',
        name: 'john',
        passwordHashed: 'hashedPassword123',
        email: 'john@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockUserService.findByEmail.mockResolvedValue(mockUser)
      ;(verifyPassword as jest.Mock).mockResolvedValue(false)

      await expect(authController.login(loginDto)).rejects.toEqual({
        error: { message: 'Invalid email or password', statusCode: 401 }
      })
    })

    it('should return 200 and a token if login is successful', async () => {
      const loginDto: LoginRequestDto = {
        email: 'user@example.com',
        password: 'password123'
      }

      const mockUser: User = {
        id: 'user-id-123',
        name: 'john',
        passwordHashed: 'hashedPassword123',
        email: 'john@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockUserService.findByEmail.mockResolvedValue(mockUser)
      ;(verifyPassword as jest.Mock).mockResolvedValue(true)
      mockAuthService.generateToken.mockReturnValue('mockedToken')

      const result: IHttpResponse<{ message: string; token?: string }> =
        await authController.login(loginDto)

      expect(result).toEqual({
        statusCode: 200,
        data: {
          message: 'Login successful',
          token: 'mockedToken'
        }
      })

      expect(mockUserService.findByEmail).toHaveBeenCalledWith(loginDto.email)
      expect(verifyPassword).toHaveBeenCalledWith(
        mockUser.passwordHashed,
        loginDto.password
      )
      expect(mockAuthService.generateToken).toHaveBeenCalledWith(mockUser.id)
    })
  })
})
