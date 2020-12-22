import { DbUpdateBrand } from '@/data/usecases/brand/update-brand/db-update-brand'
import { UpdateBrandResult } from '@/domain/usecases/brand/update-brand'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'

export const makeDbUpdateBrand = (): UpdateBrandResult => {
  const brandsRepository = new BrandsRepository()
  return new DbUpdateBrand(brandsRepository)
}
