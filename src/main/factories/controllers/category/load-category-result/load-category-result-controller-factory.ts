import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/load-category-by-id/db-load-category-by-id-factory'
import { makeDbLoadCategoryResult } from '@/main/factories/usecases/category/load-categorys-result/db-load-category-result-factory'
import { LoadCategoryResultController } from '@/presentation/controllers/category/load-categorys-result/load-categorys-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadCategoryResultCategorysController = (): Controller => {
  const controller = new LoadCategoryResultController(makeDbLoadCategoryById(), makeDbLoadCategoryResult())
  return makeLogControllerDecorator(controller)
}
