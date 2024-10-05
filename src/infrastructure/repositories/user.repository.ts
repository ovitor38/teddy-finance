import { Prisma } from '@prisma/client'
import { User } from '../../enterprise/entities/user/user.entity'
import { IUserRepository } from '../../enterprise/repositories/user.repository'
import prisma from '../database/prisma/client'
import { UserResponseDTO } from '../../presentation/dtos/user.dto'

export class PrimsaUserRepository implements IUserRepository {
  async save(userData: Prisma.UserCreateInput): Promise<UserResponseDTO> {
    const userModel = await prisma.user.create({
      data: userData
    })

    return new UserResponseDTO(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.createdAt,
      userModel.updatedAt
    )
  }

  async update(
    id: string,
    userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: userData
    })
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    const userModel = await prisma.user.findFirst({
      where: { id }
    })

    if (!userModel) return null

    return new UserResponseDTO(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.createdAt,
      userModel.updatedAt
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await prisma.user.findFirst({
      where: { email }
    })

    if (!userModel) return null

    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.passwordHashed,
      userModel.createdAt,
      userModel.updatedAt
    )
  }
}
