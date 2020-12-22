import { RemoveCategory } from '@/domain/usecases/category/remove-category'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCategoryById } from './remove-category-controller-protocols'

export class RemoveCategoryController implements Controller {
  constructor (private readonly removeCategory: RemoveCategory,
    private readonly loadCategoryById: LoadCategoryById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.params
      const category = await this.loadCategoryById.loadById(categoryId)
      if (!category) {
        return forbidden(new ValueInNothingUseError('This value is not found!'))
      }
      await this.removeCategory.removeById(categoryId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
