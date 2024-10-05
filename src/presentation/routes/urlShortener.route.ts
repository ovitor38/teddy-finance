import { Router } from 'express'
import { container } from 'tsyringe'
import { AuthService } from '../../application/services/jwtAuth.service'

export function urlShortener(app: Router): void {
  const authService = container.resolve(AuthService)

  app.post('/shorten', (req, res) => {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      const decoded = authService.verifyToken(token)

      if (decoded) {
        return res
          .status(200)
          .json({
            message: 'URL shortened for authenticated user',
            userId: decoded.userId
          })
      } else {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }
    }

    return res.status(200).json({ message: 'URL shortened for guest' })
  })
}
