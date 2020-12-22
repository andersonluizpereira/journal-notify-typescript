import { DbRemoveBrand } from '@/data/usecases/brand/remove-brand/db-remove-brand'
import { RemoveBrand } from '@/domain/usecases/brand/remove-brand'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'

export const makeDbRemoveBrand = (): RemoveBrand => {
  const brandsRepository = new BrandsRepository()
  return new DbRemoveBrand(brandsRepository)
}
