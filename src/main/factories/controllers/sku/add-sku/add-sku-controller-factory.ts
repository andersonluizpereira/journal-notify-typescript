import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddSkuController } from '@/presentation/controllers/sku/add-sku/add-sku-controller'
import { makeAddSkuValidation } from './add-sku-validation-factory'
import { makeDbAddSku } from '@/main/factories/usecases/sku/add-sku/db-add-sku-factory'

export const makeAddSkuController = (): Controller => {
  const controller = new AddSkuController(makeAddSkuValidation(), makeDbAddSku())
  return makeLogControllerDecorator(controller)
}
