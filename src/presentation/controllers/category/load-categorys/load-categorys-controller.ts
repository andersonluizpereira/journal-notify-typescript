import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadCategorys } from './load-categorys-controller-protocols'

export class LoadCategorysController implements Controller {
  constructor (private readonly loadCategory: LoadCategorys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categorys = await this.loadCategory.load()
      return categorys.length ? ok(categorys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
