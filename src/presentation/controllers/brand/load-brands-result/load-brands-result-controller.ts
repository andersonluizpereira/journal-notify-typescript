import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse, LoadBrandById, LoadBrands } from './load-brands-result-controller-protocols'

export class LoadBrandResultController implements Controller {
  constructor (private readonly loadBrandById: LoadBrandById,
    private readonly loadBrandResult: LoadBrands) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { brandId } = httpRequest.params
      const brand = await this.loadBrandById.loadById(brandId)
      if (!brand) {
        return forbidden(new InvalidParamError('brandId'))
      }
      return ok(brand)
    } catch (error) {
      return serverError(error)
    }
  }
}
