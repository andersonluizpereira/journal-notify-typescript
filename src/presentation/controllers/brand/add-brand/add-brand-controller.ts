import { Controller, HttpRequest, HttpResponse, Validation, AddBrand } from './add-brand-controller-protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class AddBrandController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addBrand: AddBrand
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        name,
        title,
        description,
        keywords,
        isActive,
        adWordsRemarketingCode,
        lomadeeCampaignCode,
        score,
        linkId
      } = httpRequest.body
      await this.addBrand.add({
        name,
        title,
        description,
        keywords,
        isActive,
        adWordsRemarketingCode,
        lomadeeCampaignCode,
        score,
        linkId
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
