import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadProductById, UpdateProductResult, Validation } from './update-product-controller-protocols'

export class UpdateProductController implements Controller {
  constructor (private readonly updateProduct: UpdateProductResult,
    private readonly loadProductById: LoadProductById,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const products = await this.loadProductById.loadById(httpRequest.body.id)
      if (!products) {
        return forbidden(new ValueInNothingUseError('This product is not found!'))
      }
      const product = await this.updateProduct.update(httpRequest.body)
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
