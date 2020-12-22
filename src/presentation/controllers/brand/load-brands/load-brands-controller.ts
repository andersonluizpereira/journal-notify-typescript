import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadBrands } from './load-brands-controller-protocols'

export class LoadBrandsController implements Controller {
  constructor (private readonly loadBrand: LoadBrands) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const brands = await this.loadBrand.load()
      return brands.length ? ok(brands) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
