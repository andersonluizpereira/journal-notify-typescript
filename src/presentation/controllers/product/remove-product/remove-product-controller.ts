import { RemoveProduct } from '@/domain/usecases/product/remove-product'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadProductById } from './remove-product-controller-protocols'

export class RemoveProductController implements Controller {
  constructor (private readonly removeProduct: RemoveProduct,
    private readonly loadProductById: LoadProductById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.params
      const product = await this.loadProductById.loadById(productId)
      if (!product) {
        return forbidden(new ValueInNothingUseError('This value is not found!'))
      }
      await this.removeProduct.removeById(productId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
