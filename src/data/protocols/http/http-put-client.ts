import { HttpResponse } from './http-response'

export type HttpPutParams<T> = {
  url: string
  body?: T
}

export interface HttpPutClient<T, R> {
  put: (params: HttpPutParams<T>) => Promise<HttpResponse<R>>
}
