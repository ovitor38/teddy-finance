import { Url } from '../../enterprise/entities/user/url.entity'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'
import prisma from '../database/prisma/client'

export class PrismaUrlRepository implements IUrlRepository {
  async save(
    completeUrl: string,
    id: string,
    userId: string
  ): Promise<Url> {
    return await prisma.url.create({
      data: { completeUrl, id, userId, clicks: 0 }
    })


  }
  async getAll(userId: string): Promise<Url[] | []> {
    const urlList = await prisma.url.findMany({
      where: { userId, deletedAt: null }
    })

    return urlList.map(
      (url) =>
        new Url(
          url.id,
          url.completeUrl,
          url.clicks ?? 0,
          url.userId,
          url.createdAt,
          url.updatedAt,
          url.deletedAt
        )
    )
  }
  async update(id: string, completeUrl: string): Promise<Url> {
    return await prisma.url.update({
      where: { deletedAt: null, id },
      data: { completeUrl }
    })
  }
  async softDelete(id: string): Promise<void> {
    await prisma.url.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }
}
