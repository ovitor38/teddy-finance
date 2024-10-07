import 'reflect-metadata'
import { container } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { AuthService } from '../../application/services/jwtAuth.service'
import { IAuthService } from '../../application/interfaces/auth.interface'

jest.mock('jsonwebtoken')

describe('AuthService', () => {
  let authService: IAuthService
  const mockJwtSecret = 'mock_secret'
  const expiresIn = '1h'

  beforeEach(() => {
    process.env.JWT_SECRET = mockJwtSecret

    authService = container.resolve(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should generate a valid token', () => {
    const userId = '123'
    const token = 'mockToken'

    ;(jwt.sign as jest.Mock).mockReturnValue(token)

    const result = authService.generateToken(userId)

    expect(result).toBe(token)
    expect(jwt.sign).toHaveBeenCalledWith({ userId }, mockJwtSecret, {
      expiresIn
    })
  })

  test('should verify a valid token', () => {
    const userId = '123'
    const token = 'validToken'

    ;(jwt.verify as jest.Mock).mockReturnValue({ userId })

    const result = authService.verifyToken(token)

    expect(result).toEqual({ userId })
    expect(jwt.verify).toHaveBeenCalledWith(token, mockJwtSecret)
  })

  test('should return null for an invalid token', () => {
    const token = 'invalidToken'

    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid or expired token')
    })

    const result = authService.verifyToken(token)

    expect(result).toBeNull()
    expect(jwt.verify).toHaveBeenCalledWith(token, mockJwtSecret)
  })
})
