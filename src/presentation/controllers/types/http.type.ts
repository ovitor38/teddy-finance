import { Request, Response } from 'express'

export interface HttpRequest extends Request{
    user?:string
}
export type HttpResponse = Response
