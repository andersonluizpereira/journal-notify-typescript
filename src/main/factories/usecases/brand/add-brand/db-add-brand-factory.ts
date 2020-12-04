import { DbAddBrand } from '@/data/usecases/brand/add-brand/db-add-brand'
import { AddBrand } from '@/domain/usecases'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'

export const makeDbAddBrand = (): AddBrand => {
  const brandsRepository = new BrandsRepository()
  return new DbAddBrand(brandsRepository)
}
