import { inject, injectable } from 'tsyringe'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'
import { randomBytes } from 'crypto'
import { Url } from '../../enterprise/entities/user/url.entity'
import { CreateShortRequestDto } from '../../presentation/dtos/url.dto'

@injectable()
export class UrlService {
  constructor(
    @inject('UrlRepository') private readonly urlRepository: IUrlRepository
  ) {}

  async create(urlDto: CreateShortRequestDto): Promise<Url | string> {
    const shortId = randomBytes(4)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 6)

    if (urlDto.userId) {
      return await this.urlRepository.save(
        urlDto.completeUrl,
        shortId,
        urlDto.userId
      )
    }

    return shortId
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
