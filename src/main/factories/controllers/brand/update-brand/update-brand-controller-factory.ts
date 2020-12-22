import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadBrandById } from '@/main/factories/usecases/brand/load-brand-by-id/db-load-brand-by-id-factory'
import { makeDbUpdateBrand } from '@/main/factories/usecases/brand/update-brand/db-update-brand-factory'
import { UpdateBrandController } from '@/presentation/controllers/brand/update-brand/update-brand-controller'
import { Controller } from '@/presentation/protocols'
import { makeUpdateBrandValidation } from './update-brand-validation-factory'

export const makeUpdateBrandController = (): Controller => {
  const controller = new UpdateBrandController(makeDbUpdateBrand(), makeDbLoadBrandById(), makeUpdateBrandValidation())
  return makeLogControllerDecorator(controller)
}
