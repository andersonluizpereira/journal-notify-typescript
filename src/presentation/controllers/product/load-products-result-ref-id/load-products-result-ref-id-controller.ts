import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse } from './load-products-result-ref-id-controller-protocols'
import { LoadProductRefById } from '@/domain/usecases/product/load-product-by-ref-id'
import { LoadProducts } from '../load-products/load-products-controller-protocols'

export class LoadProductResultController implements Controller {
  constructor (private readonly loadProductRefById: LoadProductRefById,
    private readonly loadProductResult: LoadProducts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { refId } = httpRequest.params
      const product = await this.loadProductRefById.loadByRefId(refId)
      if (!product) {
        return forbidden(new InvalidParamError('refId'))
      }
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
