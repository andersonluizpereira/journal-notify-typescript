import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadCategoryResult } from '@/main/factories/usecases/category/load-categorys-result/db-load-category-result-factory'
import { LoadCategorysController } from '@/presentation/controllers/category/load-categorys/load-categorys-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadCategorysController = (): Controller => {
  const controller = new LoadCategorysController(makeDbLoadCategoryResult())
  return makeLogControllerDecorator(controller)
}
