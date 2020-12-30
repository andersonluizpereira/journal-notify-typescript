import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { makeDbUpdateProduct } from '@/main/factories/usecases/product/update-product/db-update-product-factory'
import { UpdateProductController } from '@/presentation/controllers/product/update-product/update-product-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdateProductValidation } from './update-product-validation-factory'

export const makeUpdateProductController = (): Controller => {
  const controller = new UpdateProductController(makeDbUpdateProduct(), makeDbLoadProductById(), makeUpdateProductValidation())
  return makeLogControllerDecorator(controller)
}
