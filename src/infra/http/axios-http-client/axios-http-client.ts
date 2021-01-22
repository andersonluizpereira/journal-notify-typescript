import { HttpResponse, HttpPutClient, HttpGetClient, HttpPostClient, HttpDeleteClient } from '@/data/protocols/http'
import { HttpParams } from '@/domain/models/http/http-params'
import axios from 'axios'

export class AxiosHttpClient implements HttpPutClient<any, any>, HttpGetClient<any, any>, HttpPostClient<any, any>, HttpDeleteClient<any, any> {
  async put (params: HttpParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.put(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }

  async get (params: HttpParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.get(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }

  async post (params: HttpParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }

  async delete (params: HttpParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.delete(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
