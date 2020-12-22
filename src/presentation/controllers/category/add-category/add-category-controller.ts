import { Controller, HttpRequest, HttpResponse, Validation } from './add-category-controller-protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { AddCategory } from '@/domain/usecases/category/add-category'

export class AddCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.addCategory.add(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
