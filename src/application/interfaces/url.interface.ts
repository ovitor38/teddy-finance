import { Url } from '../../enterprise/entities/user/url.entity'
import { IguestUrlRegister } from '../../enterprise/repositories/cache.repository'
import {  ICreateUrlRequestDto, IDeleteUrlRequestDto, IUpdateUrlRequestDto } from '../../presentation/dtos/url.dto'

export interface IUrlService {
  create(urlDto: ICreateUrlRequestDto): Promise<string | IguestUrlRegister>
  incrementClick(id: string): Promise<string | null>
  getAll(userId: string): Promise<Promise<Url[] | []>>
  update(updateUrlRequestDto:IUpdateUrlRequestDto): Promise<Url>
  delete(deleteUrlRequestDto: IDeleteUrlRequestDto): Promise<string>
}
