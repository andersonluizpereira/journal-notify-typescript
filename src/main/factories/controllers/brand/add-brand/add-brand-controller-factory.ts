import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddBrandController } from '@/presentation/controllers/brand/add-brand/add-brand-controller'
import { makeAddBrandValidation } from './add-brand-validation-factory'
import { makeDbAddBrand } from '@/main/factories/usecases/brand/add-brand/db-add-brand-factory'

export const makeAddBrandController = (): Controller => {
  const controller = new AddBrandController(makeAddBrandValidation(), makeDbAddBrand())
  return makeLogControllerDecorator(controller)
}
