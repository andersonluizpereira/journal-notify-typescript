import { HttpParams } from '@/domain/models/http/http-params'
import { HttpResponse } from './http-response'

export interface HttpPutClient<T, R> {
  put: (params: HttpParams<T>) => Promise<HttpResponse<R>>
}
