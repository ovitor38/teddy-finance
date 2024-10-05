import { inject, injectable } from 'tsyringe'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'
import { randomBytes } from 'crypto'
import { CreateShortRequestDto } from '../../presentation/dtos/url.dto'
import { ICache, IguestUrlRegister } from '../../enterprise/repositories/cache.repository'

@injectable()
export class UrlService {
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

    this.cache.set(id, guestUrlRegister,600)
    return `http://localhost:${port}/${id}`
  }

  async incrementClick(id: string): Promise<string | null> {
    const cachedUrl = this.cache.get<IguestUrlRegister>(id)
    console.log(cachedUrl);
    

    if (cachedUrl) {
      cachedUrl.clicks += 1
      cachedUrl.updatedAt = new Date()

      this.cache.set(id, cachedUrl,600);
      return cachedUrl.completeUrl
    }

    const urlModel = await this.urlRepository.findById(id)

    await this.urlRepository.incrementClick(id)
    return urlModel?.completeUrl
  }

  async getAll(userId: string) {
    return await this.urlRepository.getAll(userId)
  }

  async update(urlId: string, completeUrl: string) {
    return await this.urlRepository.update(urlId, completeUrl)
  }

  async delete(urlId: string) {
    return await this.urlRepository.softDelete(urlId)
  }
}
