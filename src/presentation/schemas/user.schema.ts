import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
})
