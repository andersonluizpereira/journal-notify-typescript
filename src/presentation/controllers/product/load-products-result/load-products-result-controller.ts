import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse } from './load-products-result-controller-protocols'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { LoadProducts } from '../load-products/load-products-controller-protocols'

export class LoadProductResultController implements Controller {
  constructor (private readonly loadProductById: LoadProductById,
    private readonly loadProductResult: LoadProducts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.params
      const product = await this.loadProductById.loadById(productId)
      if (!product) {
        return forbidden(new InvalidParamError('productId'))
      }
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
