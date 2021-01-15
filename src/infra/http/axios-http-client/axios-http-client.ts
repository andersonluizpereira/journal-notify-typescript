import { HttpPutParams, HttpResponse, HttpPutClient } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPutClient<any, any> {
  async put (params: HttpPutParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.put(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
