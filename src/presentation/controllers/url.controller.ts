import { inject, injectable } from 'tsyringe';
import { CreateShortRequestDto } from '../dtos/url.dto';
import { IUrlService } from '../../application/interfaces/url.interface';
import { IAuthService } from '../../application/interfaces/auth.interface';
import { HttpRequest } from './types/http.type';
import { IErrorResponse } from '../../shared/errors/error.response';
import { IguestUrlRegister } from '../../enterprise/repositories/cache.repository';
import { IHttpResponse } from '../dtos/http.dto';

@injectable()
export class UrlController {
  constructor(
    @inject('UrlService') private readonly urlService: IUrlService,
    @inject('AuthService') private readonly authService: IAuthService
  ) {}

  async createShortenUrl(
    request: HttpRequest
  ): Promise<IHttpResponse<string | IguestUrlRegister | IErrorResponse>> {
    const authHeader = request.headers.authorization;
    let decoded: any;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        decoded = this.authService.verifyToken(token);
      } catch (error: any) {
        throw { statusCode: 401, message: error.message || 'Invalid or expired token' };
      }
    }

    if (!request.body.completeUrl) {
      throw { statusCode: 400, message: 'Complete URL is required' };
    }

    const createShortRequestDto: CreateShortRequestDto = {
      completeUrl: request.body.completeUrl,
      userId: decoded?.userId || null,
    };

    try {
      const shortenedUrl = await this.urlService.create(createShortRequestDto);
      return { statusCode: 201, data: shortenedUrl };
    } catch (error: any) {
      throw { statusCode: 400, message: error.message || 'An unexpected error occurred' };
    }
  }

  async redirect(request: HttpRequest): Promise<IHttpResponse<string | IErrorResponse | null>> {
    try {
      const { id } = request.params
      const url = await this.urlService.incrementClick(id)
      return { statusCode: 200, data: url }
    } catch (error: any) {
      throw { statusCode: 400, message: error.message || 'An unexpected error occurred' };
    }
  }
}
