import { string, z } from 'zod'

export const createUrlSchema = z.object({
  completeUrl: z
    .string({ required_error: 'Complete is required' })
    .url({ message: 'Invalid Url' }),
  userId: string().optional().nullable()
})

export const updateUrlSchema = z.object({
  completeUrl: z
    .string({ required_error: 'Complete is required' })
    .url({ message: 'Invalid Url' }),
  userId: z.string().uuid(),
  id: z.string().length(6)
})

export const deleteUrlSchema = z.object({
  userId: z.string().uuid(),
  id: z.string().length(6)
})
