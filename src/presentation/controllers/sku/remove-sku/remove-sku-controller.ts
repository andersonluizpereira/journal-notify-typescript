import { RemoveSku } from '@/domain/usecases/sku/remove-sku'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSkuById } from './remove-sku-controller-protocols'

export class RemoveSkuController implements Controller {
  constructor (private readonly removeSku: RemoveSku,
    private readonly loadSkuById: LoadSkuById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { skuId } = httpRequest.params
      const sku = await this.loadSkuById.loadById(skuId)
      if (!sku) {
        return forbidden(new ValueInNothingUseError('This value is not found!'))
      }
      await this.removeSku.removeById(skuId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
