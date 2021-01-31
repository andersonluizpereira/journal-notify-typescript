import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCategoryById, UpdateCategoryResult, Validation } from './update-category-controller-protocols'

export class UpdateCategoryController implements Controller {
  constructor (private readonly updateCategory: UpdateCategoryResult,
    private readonly loadCategoryById: LoadCategoryById,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const categorys = await this.loadCategoryById.loadById(httpRequest.body.id)
      if (!categorys) {
        return forbidden(new ValueInNothingUseError('This category is not found!'))
      }
      const category = await this.updateCategory.update(httpRequest.body)
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}
