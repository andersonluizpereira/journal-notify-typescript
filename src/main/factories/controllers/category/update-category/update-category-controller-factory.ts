import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/load-category-by-id/db-load-category-by-id-factory'
import { makeDbUpdateCategory } from '@/main/factories/usecases/category/update-category/db-update-category-factory'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category/update-category-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdateCategoryValidation } from './update-category-validation-factory'

export const makeUpdateCategoryController = (): Controller => {
  const controller = new UpdateCategoryController(makeDbUpdateCategory(), makeDbLoadCategoryById(), makeUpdateCategoryValidation())
  return makeLogControllerDecorator(controller)
}
