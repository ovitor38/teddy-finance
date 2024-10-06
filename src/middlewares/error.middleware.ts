import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { PrismaErrorCodes } from '../shared/errors/prisma-errors-code'

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case PrismaErrorCodes.UNIQUE_CONSTRAINT_VIOLATION: {
        const field = Array.isArray(err.meta?.target)
          ? err.meta.target.join(', ')
          : 'um ou mais campos'
        return res.status(400).json({
          message: `Um recurso com este(s) campo(s): ${field}, já existe.`
        })
      }

      case PrismaErrorCodes.RECORD_NOT_FOUND: {
        return res.status(404).json({ message: 'Registro não encontrado.' })
      }

      default: {
        return res.status(400).json({ message: 'Erro desconhecido do Prisma.' })
      }
    }
  }
  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Um erro inesperado ocorreu.' })
}
