import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSkuById } from '@/main/factories/usecases/sku/load-sku-by-id/db-load-sku-by-id-factory'
import { makeDbRemoveSku } from '@/main/factories/usecases/sku/remove-sku/db-remove-sku-factory'
import { RemoveSkuController } from '@/presentation/controllers/sku/remove-sku/remove-sku-controller'
import { Controller } from '@/presentation/protocols'

export const makeRemoveSkuController = (): Controller => {
  const controller = new RemoveSkuController(makeDbRemoveSku(), makeDbLoadSkuById())
  return makeLogControllerDecorator(controller)
}
