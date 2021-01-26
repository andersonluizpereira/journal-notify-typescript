import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse } from './load-skus-result-controller-protocols'
import { LoadSkuById } from '@/domain/usecases/sku/load-sku-by-id'
import { LoadSkus } from '../load-skus/load-skus-controller-protocols'

export class LoadSkuResultController implements Controller {
  constructor (private readonly loadSkuById: LoadSkuById,
    private readonly loadSkuResult: LoadSkus) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { skuId } = httpRequest.params
      const sku = await this.loadSkuById.loadById(skuId)
      if (!sku) {
        return forbidden(new InvalidParamError('skuId'))
      }
      return ok(sku)
    } catch (error) {
      return serverError(error)
    }
  }
}
