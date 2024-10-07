import 'reflect-metadata'
import { UrlService } from '../../application/services/url.service'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'
import {
  ICache,
  IguestUrlRegister
} from '../../enterprise/repositories/cache.repository'
import { ICreateUrlRequestDto } from '../../presentation/dtos/url.dto'
import { Url } from '../../enterprise/entities/user/url.entity'
import { container } from 'tsyringe'
import { IUrlService } from '../../application/interfaces/url.interface'

const mockUrlRepository: jest.Mocked<IUrlRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  incrementClick: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn()
}

const mockCache: jest.Mocked<ICache> = {
  get: jest.fn(),
  set: jest.fn()
}

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('mockedId'))
}))

describe('UrlService', () => {
  let urlService: IUrlService

  container.registerInstance('UrlRepository', mockUrlRepository)
  container.registerInstance('Cache', mockCache)


  beforeEach(() => {
    urlService = container.resolve(UrlService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('create', () => {
    it('should save URL for authenticated user and return shortened URL', async () => {
      const port = process.env.PORT || 3000
      const urlDto: ICreateUrlRequestDto = {
        completeUrl: 'http://example.com',
        userId: 'user-id-123'
      }

      const result = await urlService.create(urlDto)
      console.log(result)

      expect(mockUrlRepository.save).toHaveBeenCalledWith(
        urlDto.completeUrl,
        'bW9ja2',
        urlDto.userId
      )

      expect(result).toBe(`http://localhost:${port}/bW9ja2`)
    })

    it('should save URL in cache for guest user and return shortened URL', async () => {
      const urlDto: ICreateUrlRequestDto = {
        completeUrl: 'http://example.com'
      }
      const guestUrlRegister: IguestUrlRegister = {
        shortId: 'bW9ja2',
        completeUrl: urlDto.completeUrl,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const port = process.env.PORT || 3000

      const result = await urlService.create(urlDto)

      expect(mockCache.set).toHaveBeenCalledWith('bW9ja2', guestUrlRegister)
      expect(result).toBe(`http://localhost:${port}/bW9ja2`)
    })
  })

  describe('incrementClick', () => {
    it('should increment click for cached URL and return complete URL', async () => {
      const cachedUrl: IguestUrlRegister = {
        shortId: 'bW9ja2',
        completeUrl: 'http://example.com',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockCache.get.mockReturnValue(cachedUrl)

      const result = await urlService.incrementClick('bW9ja2')

      expect(cachedUrl.clicks).toBe(1)
      expect(mockCache.set).toHaveBeenCalledWith(
        'bW9ja2',
        expect.objectContaining({ clicks: 1 })
      )
      expect(result).toBe('http://example.com')
    })

    it('should increment click in repository if URL is not cached and return complete URL', async () => {
      const urlModel: Url = {
        id: 'mockedID',
        completeUrl: 'http://example.com',
        userId: 'user-id-123',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockCache.get.mockReturnValue(null) 
      mockUrlRepository.findById.mockResolvedValue(urlModel)

      const result = await urlService.incrementClick('mockedID')

      expect(mockUrlRepository.incrementClick).toHaveBeenCalledWith('mockedID')
      expect(result).toBe('http://example.com')
    })

    it('should return null if URL is not found in repository or cache', async () => {
      mockCache.get.mockReturnValue(null)
      mockUrlRepository.findById.mockResolvedValue(null)

      const result = await urlService.incrementClick('nonexistentID')

      expect(result).toBeNull()
    })
  })

  describe('getAll', () => {
    it('should return all URLs for the given user', async () => {
      const userId = 'user-id-123'
      const urls: Url[] = [
        {
          id: 'mockedID1',
          completeUrl: 'http://example1.com',
          userId,
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'mockedID2',
          completeUrl: 'http://example2.com',
          userId,
          clicks: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      mockUrlRepository.getAll.mockResolvedValue(urls)

      const result = await urlService.getAll(userId)

      expect(mockUrlRepository.getAll).toHaveBeenCalledWith(userId)
      expect(result).toEqual(urls)
    })
  })

  describe('update', () => {
    it('should update the URL for the given user', async () => {
      const updateDto = {
        id: 'mockedID',
        completeUrl: 'http://updated-url.com',
        userId: 'user-id-123'
      }
      const updatedUrl: Url = {
        ...updateDto,
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockUrlRepository.update.mockResolvedValue(updatedUrl)

      const result = await urlService.update(updateDto)

      expect(mockUrlRepository.update).toHaveBeenCalledWith(
        updateDto.id,
        updateDto.completeUrl,
        updateDto.userId
      )
      expect(result).toEqual(updatedUrl)
    })
  })

  describe('delete', () => {
    it('should soft delete the URL for the given user', async () => {
      const deleteDto = {
        id: 'mockedID',
        userId: 'user-id-123'
      }

      const result = await urlService.delete(deleteDto)

      expect(mockUrlRepository.softDelete).toHaveBeenCalledWith(
        deleteDto.id,
        deleteDto.userId
      )
      expect(result).toBe('ShortedUrl deleted successfully')
    })
  })
})
