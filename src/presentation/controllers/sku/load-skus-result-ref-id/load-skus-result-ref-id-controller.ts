import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse } from './load-skus-result-ref-id-controller-protocols'
import { LoadSkuRefById } from '@/domain/usecases/sku/load-sku-by-ref-id'
import { LoadSkus } from '../load-skus/load-skus-controller-protocols'

export class LoadSkuResultRefByIdController implements Controller {
  constructor (private readonly loadSkuRefById: LoadSkuRefById,
    private readonly loadSkuResult: LoadSkus) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { refId } = httpRequest.params
      const sku = await this.loadSkuRefById.loadByRefId(refId)
      if (!sku) {
        return forbidden(new InvalidParamError('refId'))
      }
      return ok(sku)
    } catch (error) {
      return serverError(error)
    }
  }
}
