import { LoginRequestDto } from '../../dtos/auth.dto'
import { IHttpResponse } from '../../dtos/http.dto'

export interface IAuthController {
  login(
    loginDto: LoginRequestDto
  ): Promise<IHttpResponse<{ message: string; token?: string }>>
}
