import { HttpPutClient, HttpPutParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPutClientSpy<T, R> implements HttpPutClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async put (params: HttpPutParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
