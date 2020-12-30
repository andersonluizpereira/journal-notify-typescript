import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { makeDbLoadProductResult } from '@/main/factories/usecases/product/load-products-result/db-load-product-result-factory'
import { LoadProductResultController } from '@/presentation/controllers/product/load-products-result/load-products-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadProductResultProductsController = (): Controller => {
  const controller = new LoadProductResultController(makeDbLoadProductById(), makeDbLoadProductResult())
  return makeLogControllerDecorator(controller)
}
