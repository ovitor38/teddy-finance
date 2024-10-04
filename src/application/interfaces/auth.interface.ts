export interface IAuthService {
  verifyToken(token: string): { userId: string } | null
  generateToken(userId: string): string
}
