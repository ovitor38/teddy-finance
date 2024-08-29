import prisma from '../database/prisma/client';
import { IUserRepository } from '../../enterprise/repositories/user.repository';
import { User } from '../../enterprise/entities/user/user.entity';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const userModel = await prisma.user.findFirst({where:{id}})


    if (!userModel) return null;
    
    return new User(userModel);
  }

  

  // Outros métodos (delete, update, etc.) podem ser adicionados aqui.
}
