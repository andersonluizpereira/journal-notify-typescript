import { makeDbLoadSkuRefById } from '@/main/factories/usecases/sku/load-sku-by-ref-id/db-load-sku-by-ref-id-factory'
import { makeDbLoadSkuResult } from '@/main/factories/usecases/sku/load-skus-result/db-load-sku-result-factory'
import { LoadSkuResultRefByIdController } from '@/presentation/controllers/sku/load-skus-result-ref-id/load-skus-result-ref-id-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadSkuResultRefByIdController = (): Controller => {
  const controller = new LoadSkuResultRefByIdController(makeDbLoadSkuRefById(), makeDbLoadSkuResult())
  return makeLogControllerDecorator(controller)
}
