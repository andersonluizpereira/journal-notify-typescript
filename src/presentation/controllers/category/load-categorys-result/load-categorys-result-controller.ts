import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse } from './load-categorys-result-controller-protocols'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { LoadCategorys } from '../load-categorys/load-categorys-controller-protocols'

export class LoadCategoryResultController implements Controller {
  constructor (private readonly loadCategoryById: LoadCategoryById,
    private readonly loadCategoryResult: LoadCategorys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { categoryId } = httpRequest.params
      const category = await this.loadCategoryById.loadById(categoryId)
      if (!category) {
        return forbidden(new InvalidParamError('categoryId'))
      }
      return ok(category)
    } catch (error) {
      return serverError(error)
    }
  }
}
