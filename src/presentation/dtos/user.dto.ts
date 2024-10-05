interface UserBaseDTO {
  name: string
  email: string
}

export interface CreateUserRequestDTO extends UserBaseDTO {
  password: string
}

export interface CreateUserResponseDTO extends UserBaseDTO {
  id: string
  createdAt: Date
}

export class UserResponseDTO {
  constructor(
    public id: string,
    public name: string | null,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
