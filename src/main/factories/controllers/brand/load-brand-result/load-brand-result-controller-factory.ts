import { makeDbLoadBrandById } from '@/main/factories/usecases/brand/load-brand-by-id/db-load-brand-by-id-factory'
import { makeDbLoadBrandResult } from '@/main/factories/usecases/brand/load-brands-result/db-load-brand-result-factory'
import { LoadBrandResultController } from '@/presentation/controllers/brand/load-brands-result/load-brands-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoadBrandResultBrandsController = (): Controller => {
  const controller = new LoadBrandResultController(makeDbLoadBrandById(), makeDbLoadBrandResult())
  return makeLogControllerDecorator(controller)
}
