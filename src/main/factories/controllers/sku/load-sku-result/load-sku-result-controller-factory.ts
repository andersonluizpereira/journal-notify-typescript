import { makeDbLoadSkuById } from '@/main/factories/usecases/sku/load-sku-by-id/db-load-sku-by-id-factory'
import { makeDbLoadSkuResult } from '@/main/factories/usecases/sku/load-skus-result/db-load-sku-result-factory'
import { LoadSkuResultController } from '@/presentation/controllers/sku/load-skus-result/load-skus-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadSkuResultSkusController = (): Controller => {
  const controller = new LoadSkuResultController(makeDbLoadSkuById(), makeDbLoadSkuResult())
  return makeLogControllerDecorator(controller)
}
