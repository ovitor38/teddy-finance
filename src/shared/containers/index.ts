import { container } from 'tsyringe'

//Repositories Imports
import { PrimsaUserRepository } from '../../infrastructure/repositories/user.repository'
import { IUserRepository } from '../../enterprise/repositories/user.repository'

//Services Imports
import { UserService } from '../../application/services/user.service'

//Presentation Controller Imports
import { UserController } from '../../presentation/controllers/user.controller'

//Infra Controller Imports
import { UserControllerHttp } from '../../infrastructure/http/controllers/user.controller'




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
