import { createHash, randomBytes } from 'crypto'

const secretKey = process.env.SECRET_KEY || ''

export function hashPassword(password: string): string {
  const hash = createHash('sha256')
  const salt = randomBytes(16).toString('hex')
  hash.update(password + salt + secretKey)
  return hash.digest('hex')
}

export function verifyPassword(
  storedPassword: string,
  password: string
): boolean {

  const hash = hashPassword(password)
  return hash === storedPassword
}
