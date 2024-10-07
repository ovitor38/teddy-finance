import { string, z } from 'zod'

export const createUrlSchema = z.object({
  completeUrl: z.string().url(),
  userId: string().optional().nullable()
})

export const updateUrlSchema = z.object({
  completeUrl: z.string().url(),
  userId: z.string().uuid(),
  id: z.string().length(6)
})

export const deleteUrlSchema = z.object({
  userId: z.string().uuid(),
  id: z.string().length(6)
})
