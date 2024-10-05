import { Url } from '../entities/user/url.entity'

export interface IUrlRepository {
  save(completeUrl: string, id: string, userId: string): Promise<Url>
  getAll(id: string): Promise<Url[] | []>
  update(id: string, completeUrl: string): unknown
  softDelete(id: string):  Promise<void> 
}
