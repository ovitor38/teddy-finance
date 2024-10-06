import { injectable, inject } from 'tsyringe'
import { UserService } from '../../application/services/user.service'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { verifyPassword } from '../../shared/utils/encrypter'
import { LoginRequestDto } from '../dtos/auth.dto'
import { IHttpResponse } from '../dtos/http.dto'
import { IAuthController } from './interfaces/auth.interface'

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject('AuthService') private authService: IAuthService,
    @inject('UserService') private userService: UserService
  ) {}

  async login(
    loginDto: LoginRequestDto
  ): Promise<IHttpResponse<{ message: string; token?: string }>> {
    const { email, password } = loginDto

    if (!email || !password) {
      return {
        statusCode: 400,
        data: { message: 'Email and password are required' }
      }
    }

    const user = await this.userService.findByEmail(email)

    if (!user || !(await verifyPassword(user?.passwordHashed, password))) {
      return { statusCode: 401, data: { message: 'Invalid email or password' } }
    }

    const token = this.authService.generateToken(user.id)

    return {
      statusCode: 200,
      data: {
        message: 'Login successful',
        token
      }
    }
  }
}
