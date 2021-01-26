import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSkuById, UpdateSkuResult, Validation } from './update-sku-controller-protocols'

export class UpdateSkuController implements Controller {
  constructor (private readonly updateSku: UpdateSkuResult,
    private readonly loadSkuById: LoadSkuById,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const skus = await this.loadSkuById.loadById(httpRequest.body.id)
      if (!skus) {
        return forbidden(new ValueInNothingUseError('This Sku is not found!'))
      }
      const Sku = await this.updateSku.update(httpRequest.body)
      return ok(Sku)
    } catch (error) {
      return serverError(error)
    }
  }
}
