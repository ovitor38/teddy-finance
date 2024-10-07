import { inject, injectable } from 'tsyringe'
import { IUrlService } from '../../application/interfaces/url.interface'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { HttpRequest } from './types/http.type'
import { IErrorResponse } from '../../shared/errors/error.response'
import { IguestUrlRegister } from '../../enterprise/repositories/cache.repository'
import { IHttpResponse } from '../dtos/http.dto'
import { IUrlController } from './interfaces/url.interface'
import { Url } from '../../enterprise/entities/user/url.entity'
import {
  createUrlSchema,
  deleteUrlSchema,
  updateUrlSchema
} from '../schemas/urls.schema'
import {
  ICreateUrlRequestDto,
  IDeleteUrlRequestDto,
  IUpdateUrlRequestDto
} from '../dtos/url.dto'

@injectable()
export class UrlController implements IUrlController {
  constructor(
    @inject('UrlService') private readonly urlService: IUrlService,
    @inject('AuthService') private readonly authService: IAuthService
  ) {}

  async createShortenUrl(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IguestUrlRegister | IErrorResponse>> {
    const authHeader = request.headers.authorization
    let decoded: any

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]

      try {
        decoded = this.authService.verifyToken(token)
      } catch (error: any) {
        throw {
          error: {
            statusCode: 401,
            message: error.message || 'Invalid or expired token'
          }
        }
      }
    }

    const createShortRequestDto: ICreateUrlRequestDto = {
      completeUrl: request.body.completeUrl,
      userId: decoded?.userId || null
    }

    const parsedData = createUrlSchema.safeParse(createShortRequestDto)

    if (!parsedData.success) {
      throw {
        error: {
          statusCode: 400,
          message: `field ${parsedData.error.issues[0].path} - ${parsedData.error.issues[0].message}`
        }
      }
    }

    try {
      const shortenedUrl = await this.urlService.create(createShortRequestDto)
      return { statusCode: 201, data: shortenedUrl }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }

  async redirect(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IErrorResponse | null>> {
    try {
      const { id } = request.params
      const url = await this.urlService.incrementClick(id)
      return { statusCode: 200, data: url }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }

  async getAll(
    request: HttpRequest
  ): Promise<IHttpResponse<Url[] | IErrorResponse>> {
    try {
      const userId = request.user || ''

      const urlList = await this.urlService.getAll(userId)
      return { statusCode: 200, data: urlList }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }

  async update(
    request: HttpRequest
  ): Promise<IHttpResponse<Url | IErrorResponse>> {
    try {
      const { id } = request.params
      const userId = request.user || ''
      const { completeUrl } = request.body
      const updateUrlDto: IUpdateUrlRequestDto = {
        id,
        completeUrl,
        userId
      }

      const parsedData = updateUrlSchema.safeParse(updateUrlDto)

      if (!parsedData.success) {
        throw {
          statusCode: 400,
          message: `field ${parsedData.error.issues[0].path} - ${parsedData.error.issues[0].message}`
        }
      }

      const url = await this.urlService.update(updateUrlDto)
      return { statusCode: 200, data: url }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }

  async delete(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IErrorResponse>> {
    try {
      const { id } = request.params
      const userId = request.user || ''

      const deleteUrlRequestDto: IDeleteUrlRequestDto = {
        id,
        userId
      }

      const parsedData = deleteUrlSchema.safeParse(deleteUrlRequestDto)

      if (!parsedData.success) {
        throw {
          statusCode: 400,
          message: `field ${parsedData.error.issues[0].path} - ${parsedData.error.issues[0].message}`
        }
      }

      const result = await this.urlService.delete(deleteUrlRequestDto)
      return { statusCode: 200, data: result }
    } catch (error: any) {
      throw {
        statusCode: 400,
        error: error || 'An unexpected error occurred'
      }
    }
  }
}
