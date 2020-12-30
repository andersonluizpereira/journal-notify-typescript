import { Controller, HttpRequest, HttpResponse, Validation } from './add-product-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddProduct } from '@/domain/usecases/product/add-product'

export class AddProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const product = await this.addProduct.add(httpRequest.body)
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
