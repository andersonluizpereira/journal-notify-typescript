import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/load-category-by-id/db-load-category-by-id-factory'
import { makeDbRemoveCategory } from '@/main/factories/usecases/category/remove-category/db-remove-category-factory'
import { RemoveCategoryController } from '@/presentation/controllers/category/remove-category/remove-category-controller'
import { Controller } from '@/presentation/protocols'

export const makeRemoveCategoryController = (): Controller => {
  const controller = new RemoveCategoryController(makeDbRemoveCategory(), makeDbLoadCategoryById())
  return makeLogControllerDecorator(controller)
}
