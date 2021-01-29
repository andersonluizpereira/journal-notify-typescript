import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSkuResult } from '@/main/factories/usecases/sku/load-skus-result/db-load-sku-result-factory'
import { LoadSkusController } from '@/presentation/controllers/sku/load-skus/load-skus-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadSkusController = (): Controller => {
  const controller = new LoadSkusController(makeDbLoadSkuResult())
  return makeLogControllerDecorator(controller)
}
