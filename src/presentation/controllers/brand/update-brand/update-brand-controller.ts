import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadBrandById, UpdateBrandResult, Validation } from './update-brand-controller-protocols'

export class UpdateBrandController implements Controller {
  constructor (private readonly updateBrand: UpdateBrandResult,
    private readonly loadBrandById: LoadBrandById,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const brands = await this.loadBrandById.loadById(httpRequest.body.id)
      if (!brands) {
        console.log(brands)
        return forbidden(new ValueInNothingUseError('This brand is not found!'))
      }
      const brand = await this.updateBrand.update(httpRequest.body)
      return ok(brand)
    } catch (error) {
      return serverError(error)
    }
  }
}
