import { DbLoadBrands } from '@/data/usecases/brand/load-brand/db-load-brand'
import { LoadBrands } from '@/domain/usecases/brand/load-brands'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'

export const makeDbLoadBrandResult = (): LoadBrands => {
  const brandsRepository = new BrandsRepository()
  return new DbLoadBrands(brandsRepository)
}
