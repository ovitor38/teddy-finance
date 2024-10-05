export interface IUrlRepository {
  save(url: string): unknown
  getAll(userId: string): unknown
  update(urlId: string, completeUrl: string): unknown
  softDelete(urlId: string): unknown
}
