export interface ICreateUrlRequestDto {
  completeUrl: string
  userId?: string
}

export interface IUpdateUrlRequestDto extends ICreateUrlRequestDto {
  id: string
  userId: string
}
export interface IDeleteUrlRequestDto {
  id: string
  userId: string
}
