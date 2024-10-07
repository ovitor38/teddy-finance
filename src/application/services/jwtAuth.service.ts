import jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'
import { IAuthService } from '../interfaces/auth.interface'

@injectable()
export class AuthService implements IAuthService {
  private jwtSecret: string
  private expiresIn: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default_secret'
    this.expiresIn = process.env.JWT_EXPIRES_IN || '1h'
  }

  verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string }
      return { userId: decoded.userId }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return null
    }
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: this.expiresIn})
  }
}
