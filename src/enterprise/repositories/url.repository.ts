import { Url } from '../entities/user/url.entity'

export interface IUrlRepository {
  save(completeUrl: string, id: string, userId: string): Promise<Url>
  getAll(id: string): Promise<Url[] | []>
  update(id: string, completeUrl: string, userId: string): Promise<Url>
  softDelete(id: string, userId: string):  Promise<void>
  incrementClick(id: string): Promise<void>
  findById(id: string): Promise<Url | null>
}
