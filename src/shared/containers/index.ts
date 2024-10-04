import { container } from 'tsyringe'

//interface Imports
import { IUserRepository } from '../../enterprise/repositories/user.repository'
import { IAuthService } from '../../application/interfaces/auth.interface'

//Repositories Imports
import { PrimsaUserRepository } from '../../infrastructure/repositories/user.repository'

//Services Imports
import { UserService } from '../../application/services/user.service'
import { AuthService } from '../../application/services/jwtAuth.service'

//Presentation Controller Imports
import { UserController } from '../../presentation/controllers/user.controller'
import { AuthController } from '../../presentation/controllers/auth.controller'

//Infra Controller Imports
import { UserControllerHttp } from '../../infrastructure/http/controllers/user.controller'
import { AuthControllerHttp } from '../../infrastructure/http/controllers/auth.controller'

//Repositories
container.registerSingleton<IUserRepository>(
  'UserRepository',
  PrimsaUserRepository
)

//Services
container.register('UserService', UserService)
container.register<IAuthService>('AuthService', AuthService)

//Presentation Controller
container.register('UserController', UserController)
container.register('AuthController', AuthController)

//Infra Controller
container.register('UserControllerHttp', UserControllerHttp)
container.register('AuthControllerHttp', AuthControllerHttp)
