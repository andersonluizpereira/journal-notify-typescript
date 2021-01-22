import { HttpParams } from '@/domain/models/http/http-params'
import { HttpResponse } from './http-response'

export interface HttpDeleteClient<T, R> {
  delete: (params: HttpParams<T>) => Promise<HttpResponse<R>>
}
