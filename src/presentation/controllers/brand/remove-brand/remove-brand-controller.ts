import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadBrandById, RemoveBrand } from './remove-brand-controller-protocols'

export class RemoveBrandController implements Controller {
  constructor (private readonly removeBrand: RemoveBrand,
    private readonly loadBrandById: LoadBrandById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { brandId } = httpRequest.params
      const brand = await this.loadBrandById.loadById(brandId)
      if (!brand) {
        return forbidden(new ValueInNothingUseError('This value is not found!'))
      }
      await this.removeBrand.removeById(brandId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
