import { NextFunction } from 'express'
import { injectable, inject } from 'tsyringe'
import { IAuthService } from '../application/interfaces/auth.interface'
import {
  HttpRequest,
  HttpResponse
} from '../presentation/controllers/types/http.type'

@injectable()
export class AuthMiddleware {
  constructor(@inject('AuthService') private authService: IAuthService) {}

  handle(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = this.authService.verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    req.user = decoded.userId
    next()
  }
}
