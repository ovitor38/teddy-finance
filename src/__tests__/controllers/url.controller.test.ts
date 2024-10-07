import 'reflect-metadata'
import { UrlController } from '../../presentation/controllers/url.controller'
import { IUrlService } from '../../application/interfaces/url.interface'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { IHttpResponse } from '../../presentation/dtos/http.dto'
import { Url } from '../../enterprise/entities/user/url.entity'
import { container } from 'tsyringe'
import { HttpRequest } from '../../presentation/controllers/types/http.type'
import { IguestUrlRegister } from '../../enterprise/repositories/cache.repository'
import { IErrorResponse } from '../../shared/errors/error.response'
import { IUrlController } from '../../presentation/controllers/interfaces/url.interface'

const mockUrlService: jest.Mocked<IUrlService> = {
  create: jest.fn(),
  incrementClick: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}

const mockAuthService: jest.Mocked<IAuthService> = {
  verifyToken: jest.fn(),
  generateToken: jest.fn()
}

let urlController: IUrlController

beforeEach(() => {
  container.registerInstance<IAuthService>('AuthService', mockAuthService)
  container.registerInstance<IUrlService>('UrlService', mockUrlService)

  urlController = container.resolve(UrlController)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('UrlController', () => {
  describe('createShortenUrl', () => {
    it('should return 400 if completeUrl is missing', async () => {
      const request = {
        body: {},
        headers: {}
      } as HttpRequest

      await expect(urlController.createShortenUrl(request)).rejects.toEqual({
        error: {
          statusCode: 400,
          message: 'field completeUrl - Required'
        }
      })
    })

    it('should return 401 if token is invalid', async () => {
      const request = {
        body: { completeUrl: 'http://example.com' },
        headers: { authorization: 'Bearer invalidToken' }
      } as HttpRequest

      mockAuthService.verifyToken.mockImplementation(() => {
        throw new Error('Invalid or expired token')
      })

      await expect(urlController.createShortenUrl(request)).rejects.toEqual({
        error: {
          statusCode: 401,
          message: 'Invalid or expired token'
        }
      })
    })

    it('should create a shortened URL successfully', async () => {
      const request = {
        body: { completeUrl: 'http://example.com' },
        headers: { authorization: 'Bearer validToken' }
      } as HttpRequest

      const mockDecoded = { userId: 'user-id-123' }
      mockAuthService.verifyToken.mockReturnValue(mockDecoded)
      mockUrlService.create.mockResolvedValue('shortenedUrl')

      const response: IHttpResponse<
        string | IguestUrlRegister | IErrorResponse
      > = await urlController.createShortenUrl(request)

      expect(response).toEqual({
        statusCode: 201,
        data: 'shortenedUrl'
      })
      expect(mockUrlService.create).toHaveBeenCalledWith({
        completeUrl: 'http://example.com',
        userId: mockDecoded.userId
      })
    })

    it('should return 400 if an unexpected error occurs', async () => {
      const request = {
        body: { completeUrl: 'http://example.com' },
        headers: {}
      } as HttpRequest

      const errorMessage = new Error('Some unexpected error')

      mockUrlService.create.mockRejectedValue(errorMessage)

      await expect(urlController.createShortenUrl(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })

  describe('redirect', () => {
    it('should return the URL for the given ID', async () => {
      const request = {
        params: { id: 'shortUrlId' }
      } as unknown as HttpRequest

      const mockUrl = 'http://example.com'
      mockUrlService.incrementClick.mockResolvedValue(mockUrl)

      const response: IHttpResponse<string | IErrorResponse | null> =
        await urlController.redirect(request)

      expect(response).toEqual({
        statusCode: 200,
        data: mockUrl
      })
    })

    it('should return 400 if an unexpected error occurs', async () => {
      const request = {
        params: { id: 'shortUrlId' }
      } as unknown as HttpRequest

      const errorMessage = new Error('Unexpected error')

      mockUrlService.incrementClick.mockRejectedValue(errorMessage)

      await expect(urlController.redirect(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })

  describe('getAll', () => {
    it('should return a list of URLs', async () => {
      const request = {
        user: 'user-id-123'
      } as HttpRequest

      const mockUrls = [{ id: '1', completeUrl: 'http://example.com' } as Url]
      mockUrlService.getAll.mockResolvedValue(Promise.resolve(mockUrls))

      const response: IHttpResponse<IErrorResponse | Url[]> =
        await urlController.getAll(request)

      expect(response).toEqual({
        statusCode: 200,
        data: mockUrls
      })
    })

    it('should return 400 if an unexpected error occurs', async () => {
      const request = {
        user: 'user-id-123'
      } as HttpRequest

      const errorMessage = new Error('Unexpected error')

      mockUrlService.getAll.mockRejectedValue(errorMessage)

      await expect(urlController.getAll(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })

  describe('update', () => {
    it('should return 400 if completeUrl is missing', async () => {
      const request = {
        body: {},
        params: { id: 'urlId2' },
        user: 'ac3417c6-b46d-4a45-8bbf-70929c4a67b1'
      } as unknown as HttpRequest

      await expect(urlController.update(request)).rejects.toEqual({
        statusCode: 400,
        error: {
          message: 'field completeUrl - Required',
          statusCode: 400
        }
      })
    })

    it('should update the URL successfully', async () => {
      const request = {
        body: { completeUrl: 'http://updated-url.com' },
        params: { id: 'urlId4' },
        user: 'ac3417c6-b46d-4a45-8bbf-70929c4a67b1'
      } as unknown as HttpRequest

      const mockUrl = {
        id: 'urlId',
        completeUrl: 'http://updated-url.com'
      } as Url
      mockUrlService.update.mockResolvedValue(mockUrl)

      const response: IHttpResponse<Url | IErrorResponse> =
        await urlController.update(request)

      expect(response).toEqual({
        statusCode: 200,
        data: mockUrl
      })
    })

    it('should return 400 if an unexpected error occurs', async () => {
      const request = {
        body: { completeUrl: 'http://updated-url.com' },
        params: { id: 'usrlId' },
        user: 'ac3417c6-b46d-4a45-8bbf-70929c4a67b1'
      } as unknown as HttpRequest

      const errorMessage = new Error('Unexpected error')

      mockUrlService.update.mockRejectedValue(errorMessage)

      await expect(urlController.update(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })

  describe('delete', () => {
    it('should delete a URL successfully', async () => {
      const request = {
        params: { id: 'urlId3' },
        user: 'ac3417c6-b46d-4a45-8bbf-70929c4a67b1'
      } as unknown as HttpRequest

      mockUrlService.delete.mockResolvedValue('Deleted successfully')

      const response: IHttpResponse<string | IErrorResponse> =
        await urlController.delete(request)

      expect(response).toEqual({
        statusCode: 200,
        data: 'Deleted successfully'
      })
    })

    it('should return 400 if an unexpected error occurs', async () => {
      const request = {
        params: { id: '44qwda' },
        user: 'ac3417c6-b46d-4a45-8bbf-70929c4a67b1'
      } as unknown as HttpRequest

      const errorMessage = new Error('Unexpected error')

      mockUrlService.delete.mockRejectedValue(errorMessage)

      await expect(urlController.delete(request)).rejects.toEqual({
        statusCode: 400,
        error: errorMessage
      })
    })
  })
})
