import { Url } from '../../enterprise/entities/user/url.entity'
import { IguestUrlRegister } from '../../enterprise/repositories/cache.repository'
import { CreateShortRequestDto } from '../../presentation/dtos/url.dto'

export interface IUrlService {
  create(urlDto: CreateShortRequestDto): Promise<string | IguestUrlRegister>
  incrementClick(id: string): Promise<string | null>
  getAll(userId: string): Promise<Promise<Url[] | []>>
  update(id: string, completeUrl: string, userId:string): Promise<Url>
  delete(id: string, userId:string): Promise<string>
}
