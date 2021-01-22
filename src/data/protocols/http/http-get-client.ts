import { HttpParams } from '@/domain/models/http/http-params'
import { HttpResponse } from './http-response'

export interface HttpGetClient<T, R> {
  get: (params: HttpParams<T>) => Promise<HttpResponse<R>>
}
