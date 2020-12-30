import { makeDbLoadProductRefById } from '@/main/factories/usecases/product/load-product-by-ref-id/db-load-product-by-ref-id-factory'
import { makeDbLoadProductResult } from '@/main/factories/usecases/product/load-products-result/db-load-product-result-factory'
import { LoadProductResultRefByIdController } from '@/presentation/controllers/product/load-products-result-ref-id/load-products-result-ref-id-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadProductResultRefByIdController = (): Controller => {
  const controller = new LoadProductResultRefByIdController(makeDbLoadProductRefById(), makeDbLoadProductResult())
  return makeLogControllerDecorator(controller)
}
