import { container } from 'tsyringe'

//interface Imports
import { IUserRepository } from '../../enterprise/repositories/user.repository'
import { IAuthService } from '../../application/interfaces/auth.interface'
import { IUrlRepository } from '../../enterprise/repositories/url.repository'

//Repositories Imports
import { PrimsaUserRepository } from '../../infrastructure/repositories/user.repository'
import { PrismaUrlRepository } from '../../infrastructure/repositories/url.repository'

//Services Imports
import { UserService } from '../../application/services/user.service'
import { AuthService } from '../../application/services/jwtAuth.service'
import { UrlService } from '../../application/services/url.service'

//Presentation Controller Imports
import { UserController } from '../../presentation/controllers/user.controller'
import { AuthController } from '../../presentation/controllers/auth.controller'
import { UrlController } from '../../presentation/controllers/url.controller'

//Infra Controller Imports
import { UserControllerHttp } from '../../infrastructure/http/controllers/user.controller'
import { AuthControllerHttp } from '../../infrastructure/http/controllers/auth.controller'


import { AuthMiddleware } from '../../middlewares/auth.middleware'

//Repositories
container.registerSingleton<IUserRepository>(
  'UserRepository',
  PrimsaUserRepository
)
container.registerSingleton<IUrlRepository>('UrlRepository', PrismaUrlRepository)

//Middlewares
container.register('AuthMiddleware', AuthMiddleware)

//Services
container.register('UserService', UserService)
container.register<IAuthService>('AuthService', AuthService)
container.register('UrlService',UrlService)

//Presentation Controller
container.register('UserController', UserController)
container.register('AuthController', AuthController)
container.register('UrlController', UrlController)

//Infra Controller
container.register('UserControllerHttp', UserControllerHttp)
container.register('AuthControllerHttp', AuthControllerHttp)

