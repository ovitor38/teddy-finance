import { container } from 'tsyringe'
import { PrimsaUserRepository } from '../../infrastructure/repositories/user.repository'
import { UserService } from '../../enterprise/services/user.service'
import { UserController } from '../../presentation/controllers/user.controller'
import { UserControllerHttp } from '../../infrastructure/http/user.controller'
import { IUserRepository } from '../../enterprise/repositories/user.repository'

//Repositories
container.registerSingleton<IUserRepository>(
  'UserRepository',
  PrimsaUserRepository
)

//Services
container.register('UserService', UserService)

//Presentation Controller
container.register('UserController', UserController)

//Infra Controller
container.register('UserControllerHttp', UserControllerHttp)
