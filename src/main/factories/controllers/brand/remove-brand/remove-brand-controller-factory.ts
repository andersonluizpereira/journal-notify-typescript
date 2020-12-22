import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadBrandById } from '@/main/factories/usecases/brand/load-brand-by-id/db-load-brand-by-id-factory'
import { makeDbRemoveBrand } from '@/main/factories/usecases/brand/remove-brand/db-remove-brand-factory'
import { RemoveBrandController } from '@/presentation/controllers/brand/remove-brand/remove-brand-controller'
import { Controller } from '@/presentation/protocols'

export const makeRemoveBrandController = (): Controller => {
  const controller = new RemoveBrandController(makeDbRemoveBrand(), makeDbLoadBrandById())
  return makeLogControllerDecorator(controller)
}
