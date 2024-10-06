import { Url } from '../../../enterprise/entities/user/url.entity'
import { IguestUrlRegister } from '../../../enterprise/repositories/cache.repository'
import { IErrorResponse } from '../../../shared/errors/error.response'
import { IHttpResponse } from '../../dtos/http.dto'
import { HttpRequest } from '../types/http.type'

export interface IUrlController {
  createShortenUrl(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IguestUrlRegister | IErrorResponse>>

  redirect(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IErrorResponse | null>>

  getAll(request: HttpRequest): Promise<IHttpResponse<Url[] | IErrorResponse>>

  update(request: HttpRequest): Promise<IHttpResponse<Url | IErrorResponse>>

  delete(request: HttpRequest): Promise<IHttpResponse<string | IErrorResponse>>
}
