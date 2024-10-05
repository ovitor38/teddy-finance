import { inject, injectable } from 'tsyringe'
import { UrlService } from '../../application/services/url.service'
import { CreateShortRequestDto } from '../dtos/url.dto'
import { AuthService } from '../../application/services/jwtAuth.service'

@injectable()
export class UrlController {
  constructor(
    @inject('UrlService') private readonly urlService: UrlService,
    @inject('AuthService') private readonly authService: AuthService
  ) {}

  async createShortenUrl(request: any): Promise<unknown> {
    const authHeader = request.headers.authorization
    let decoded: any

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]

      try {
        decoded = this.authService.verifyToken(token)
      } catch (error: any) {
        return { statusCode: 401, data: { error: 'Invalid or expired token.' } }
      }
    }

    if (!request.body.completeUrl) {
      return { statusCode: 400, data: { error: 'Complete URL is required.' } }
    }

    const createShortRequestDto: CreateShortRequestDto = {
      completeUrl: request.body.completeUrl,
      userId: decoded?.userId || null
    }

    try {
      const shortenedUrl = await this.urlService.create(createShortRequestDto)
      return { statusCode: 201, data: shortenedUrl }
    } catch (error: any) {
      return { statusCode: 400, data: { error: error.message } }
    }
  }

  async redirect(request: any) {
    try {
      const { id } = request.params
      const url = await this.urlService.incrementClick(id)
      return { statusCode: 200, data: url }
    } catch (error: any) {
      return { statusCode: 400, data: { error: error.message } }
    }
  }
}
