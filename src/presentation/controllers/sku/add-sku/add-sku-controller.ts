import { Controller, HttpRequest, HttpResponse, Validation } from './add-sku-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddSku } from '@/domain/usecases/sku/add-sku'

export class AddSkuController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSku: AddSku
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const sku = await this.addSku.add(httpRequest.body)
      return ok(sku)
    } catch (error) {
      return serverError(error)
    }
  }
}
