import { HttpParams } from '@/domain/models/http/http-params'
import { HttpResponse } from './http-response'

export interface HttpPostClient<T, R> {
  post: (params: HttpParams<T>) => Promise<HttpResponse<R>>
}
