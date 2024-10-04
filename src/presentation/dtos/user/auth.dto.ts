export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  message: string
  statusCode: number
}
