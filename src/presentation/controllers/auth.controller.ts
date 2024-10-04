import { injectable, inject } from 'tsyringe'
import { UserService } from '../../application/services/user.service'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { verifyPassword } from '../../shared/utils/encrypter'
import { LoginRequestDto} from '../dtos/user/auth.dto'
import {  IHttpResponse } from '../dtos/user/http.dto'

@injectable()
export class AuthController {
  constructor(
    @inject('AuthService') private authService: IAuthService,
    @inject('UserService') private userService: UserService
  ) {}

  async login(loginDto: LoginRequestDto): Promise<IHttpResponse<{ message: string, token?: string }>> {
    const { email, password } = loginDto

    if (!email || !password) {
      return {
        statusCode: 400,
        data: { message: 'Email and password are required' }
      }
    }

    const user = await this.userService.findByEmail(email)

    if (!user) {
        return { statusCode: 401, data: { message: 'User Not Found' } }
      }

    const isPasswordCorrect = await verifyPassword(user?.passwordHashed, password)

    if (!isPasswordCorrect) {
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
