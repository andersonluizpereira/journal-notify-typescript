import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadBrandResult } from '@/main/factories/usecases/brand/load-brands-result/db-load-brand-result-factory'
import { LoadBrandsController } from '@/presentation/controllers/brand/load-brands/load-brands-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadBrandsController = (): Controller => {
  const controller = new LoadBrandsController(makeDbLoadBrandResult())
  return makeLogControllerDecorator(controller)
}
