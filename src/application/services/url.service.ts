import { inject, injectable } from 'tsyringe'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'
import { randomBytes } from 'crypto'
import { CreateShortRequestDto } from '../../presentation/dtos/url.dto'
import {
  ICache,
  IguestUrlRegister
} from '../../enterprise/repositories/cache.repository'
import { IUrlService } from '../interfaces/url.interface'
import { Url } from '../../enterprise/entities/user/url.entity'

@injectable()
export class UrlService implements IUrlService {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository,
    @inject('Cache') private cache: ICache
  ) {}

  async create(
    urlDto: CreateShortRequestDto
  ): Promise<string | IguestUrlRegister> {
    const port = process.env.PORT || 3000
    const id = randomBytes(4)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 6)

    if (urlDto.userId) {
      await this.urlRepository.save(urlDto.completeUrl, id, urlDto.userId)
      return `http://localhost:${port}/${id}`
    }

    const guestUrlRegister: IguestUrlRegister = {
      shortId: id,
      completeUrl: urlDto.completeUrl,
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.cache.set(id, guestUrlRegister, 600)
    return `http://localhost:${port}/${id}`
  }

  async incrementClick(id: string): Promise<string | null> {
    const cachedUrl = this.cache.get<IguestUrlRegister>(id)

    if (cachedUrl) {
      cachedUrl.clicks += 1
      cachedUrl.updatedAt = new Date()

      this.cache.set(id, cachedUrl, 600)
      return cachedUrl.completeUrl
    }

    const urlModel = await this.urlRepository.findById(id)

    if(!urlModel) return null

    await this.urlRepository.incrementClick(id)
    return urlModel?.completeUrl
  }

  async getAll(userId: string): Promise<Promise<Url[] | []>> {
    return await this.urlRepository.getAll(userId)
  }

  async update(id: string, completeUrl: string): Promise<Url> {
    return await this.urlRepository.update(id, completeUrl)
  }

  async delete(id: string): Promise<string> {
    await this.urlRepository.softDelete(id)
    return 'ShortedUrl deleted successfully'
  }
}
