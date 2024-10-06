import { User } from "../../enterprise/entities/user/user.entity";
import { CreateUserRequestDTO, UserResponseDTO } from "../../presentation/dtos/user.dto";

export interface IUSerService{
    create(userDto: CreateUserRequestDTO): Promise<UserResponseDTO>
    findByEmail(email: string): Promise<User| null> 
}