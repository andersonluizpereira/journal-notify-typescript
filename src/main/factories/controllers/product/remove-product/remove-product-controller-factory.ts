import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { makeDbRemoveProduct } from '@/main/factories/usecases/product/remove-product/db-remove-product-factory'
import { RemoveProductController } from '@/presentation/controllers/product/remove-product/remove-product-controller'
import { Controller } from '@/presentation/protocols'

export const makeRemoveProductController = (): Controller => {
  const controller = new RemoveProductController(makeDbRemoveProduct(), makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
