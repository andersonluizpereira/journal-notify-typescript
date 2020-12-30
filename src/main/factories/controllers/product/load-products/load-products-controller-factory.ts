import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadProductResult } from '@/main/factories/usecases/product/load-products-result/db-load-product-result-factory'
import { LoadProductsController } from '@/presentation/controllers/product/load-products/load-products-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadProductsController = (): Controller => {
  const controller = new LoadProductsController(makeDbLoadProductResult())
  return makeLogControllerDecorator(controller)
}
