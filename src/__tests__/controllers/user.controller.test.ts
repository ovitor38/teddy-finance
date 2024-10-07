import 'reflect-metadata'
import { UserController } from '../../presentation/controllers/user.controller'
import { IUSerService } from '../../application/interfaces/user.interface'
import { IErrorResponse } from '../../shared/errors/error.response'
import { container } from 'tsyringe'
import { HttpRequest } from '../../presentation/controllers/types/http.type'
import { UserResponseDTO } from '../../presentation/dtos/user.dto'
import { IHttpResponse } from '../../presentation/dtos/http.dto'

// Mock do UserService
const mockUserService: jest.Mocked<IUSerService> = {
  create: jest.fn(),
  findByEmail: jest.fn()
} as any

jest.mock('../../shared/utils/encrypter', () => ({
    verifyPassword: jest.fn(),
  }));

describe('UserController', () => {
  let userController: UserController

  beforeEach(() => {
    container.registerInstance<IUSerService>('UserService', mockUserService)
    userController = container.resolve(UserController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a user and return a 201 status', async () => {
      const request = {
        body: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123'
        }
      } as HttpRequest

      const expectedUser: UserResponseDTO = {
        id: 'user-id-123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockUserService.create.mockResolvedValue(expectedUser)

      const response: IHttpResponse<UserResponseDTO | IErrorResponse> =
        await userController.createUser(request)

      expect(response.statusCode).toBe(201)
      expect(response.data).toEqual(expectedUser)
      expect(mockUserService.create).toHaveBeenCalledWith(request.body)
    })

    it('should return a 400 status if name have min lenght of 3', async () => {
      const request: HttpRequest = {
        body: {
          name: '',
          email: 'john.doe@example.com',
          password: 'password123'
        }
      } as HttpRequest

      await expect(userController.createUser(request)).rejects.toEqual({
        statusCode: 400,
        error: {
          statusCode: 400,
          message: 'String must contain at least 3 character(s)'
        }
      })
    })

    it('should return a 400 status if name is not a string type', async () => {
      const request: HttpRequest = {
        body: {
          name: 0,
          email: 'john.doe@example.com',
          password: 'password123'
        }
      } as HttpRequest

      await expect(userController.createUser(request)).rejects.toEqual({
        statusCode: 400,
        error: {
          statusCode: 400,
          message: `Expected string, received ${typeof request.body.name}`
        }
      })
    })

    it('should return a 400 status if email is not valid', async () => {
      const request: HttpRequest = {
        body: {
          name: 'john',
          email: 'john.doeexample.com',
          password: 'password123'
        }
      } as HttpRequest

      await expect(userController.createUser(request)).rejects.toEqual({
        statusCode: 400,
        error: {
          statusCode: 400,
          message: `Invalid email`
        }
      })
    })

    it('should return a 400 status if pasword is not valid type', async () => {
      const request: HttpRequest = {
        body: {
          name: 'john',
          email: 'john.doe@example.com',
          password: 0
        }
      } as HttpRequest

      await expect(userController.createUser(request)).rejects.toEqual({
        statusCode: 400,
        error: {
          statusCode: 400,
          message: `Expected string, received number`
        }
      })
    })

    it('should return a 400 status for unexpected errors', async () => {
      const request: HttpRequest = {
        body: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123'
        }
      } as HttpRequest

      const errorMessage = new Error('Some unexpected error')

      mockUserService.create.mockRejectedValue(errorMessage)

      await expect(userController.createUser(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })
})
