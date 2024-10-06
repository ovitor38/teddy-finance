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
import { AuthControllerHttp } from '../../infrastructure/http/adapters/auth.adapter'


import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { ICache } from '../../enterprise/repositories/cache.repository'
import { NodeCacheService } from '../../infrastructure/repositories/cache.repository'
import { IUSerService } from '../../application/interfaces/user.interface'
import { UserHttpAdapter } from '../../infrastructure/http/adapters/user.adapter'
import { IUrlService } from '../../application/interfaces/url.interface'

//Repositories
container.registerSingleton<IUserRepository>(
  'UserRepository',
  PrimsaUserRepository
)
container.registerSingleton<IUrlRepository>('UrlRepository', PrismaUrlRepository)

//Middlewares
container.register('AuthMiddleware', AuthMiddleware)

//Services
container.register<IUSerService>('UserService', UserService)
container.register<IAuthService>('AuthService', AuthService)
container.register<IUrlService>('UrlService',UrlService)

//Presentation Controller
container.register('UserController', UserController)
container.register('AuthController', AuthController)
container.register('UrlController', UrlController)

//Infra Adapters
container.register('UserHttpAdapter', UserHttpAdapter)
container.register('AuthControllerHttp', AuthControllerHttp)

container.register<ICache>('Cache', {
  useClass: NodeCacheService,
});