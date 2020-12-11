import { DbLoadBrandById } from '@/data/usecases/brand/load-brand-by-id/db-load-brand-by-id'
import { LoadBrandById } from '@/domain/usecases/brand/load-brand-by-id'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'
export const makeDbLoadBrandById = (): LoadBrandById => {
  const brandsRepository = new BrandsRepository()
  return new DbLoadBrandById(brandsRepository)
}
