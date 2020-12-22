import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddCategoryController } from '@/presentation/controllers/category/add-category/add-category-controller'
import { makeAddCategoryValidation } from './add-category-validation-factory'
import { makeDbAddCategory } from '@/main/factories/usecases/category/add-category/db-add-category-factory'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  return makeLogControllerDecorator(controller)
}
