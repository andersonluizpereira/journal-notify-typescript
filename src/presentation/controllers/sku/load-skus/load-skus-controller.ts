import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSkus } from './load-skus-controller-protocols'

export class LoadSkusController implements Controller {
  constructor (private readonly loadSku: LoadSkus) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const skus = await this.loadSku.load()
      return skus.length ? ok(skus) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
