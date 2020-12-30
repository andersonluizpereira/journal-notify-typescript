import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadProducts } from './load-products-controller-protocols'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProduct: LoadProducts) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.loadProduct.load()
      return products.length ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
