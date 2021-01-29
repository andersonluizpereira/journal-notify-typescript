import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSkuById } from '@/main/factories/usecases/sku/load-sku-by-id/db-load-sku-by-id-factory'
import { makeDbUpdateSku } from '@/main/factories/usecases/sku/update-sku/db-update-sku-factory'
import { UpdateSkuController } from '@/presentation/controllers/sku/update-sku/update-sku-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdateSkuValidation } from './update-sku-validation-factory'

export const makeUpdateSkuController = (): Controller => {
  const controller = new UpdateSkuController(makeDbUpdateSku(), makeDbLoadSkuById(), makeUpdateSkuValidation())
  return makeLogControllerDecorator(controller)
}
