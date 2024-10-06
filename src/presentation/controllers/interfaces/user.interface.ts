import { IErrorResponse } from '../../../shared/errors/error.response'
import { IHttpResponse } from '../../dtos/http.dto'
import { UserResponseDTO } from '../../dtos/user.dto'
import { HttpRequest } from '../types/http.type'

export interface IUserController {
  createUser(
    request: HttpRequest
  ): Promise<IHttpResponse<UserResponseDTO | IErrorResponse>>
}
