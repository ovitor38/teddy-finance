import jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'
import { IAuthService } from '../interfaces/auth.interface'

@injectable()
export class AuthService implements IAuthService {
  private jwtSecret: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default_secret'
  }

  verifyToken(token: string): { userId: string } | null {
    const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
    return { userId: decoded.userId };
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: '1h' })
  }
}
