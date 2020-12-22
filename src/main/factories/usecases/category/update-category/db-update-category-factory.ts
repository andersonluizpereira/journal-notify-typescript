import { DbUpdateCategory } from '@/data/usecases/category/update-category/db-update-category'
import { UpdateCategoryResult } from '@/domain/usecases/category/update-category'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'

export const makeDbUpdateCategory = (): UpdateCategoryResult => {
  const categorysRepository = new CategorysRepository()
  return new DbUpdateCategory(categorysRepository)
}
