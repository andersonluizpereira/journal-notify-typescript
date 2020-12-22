import { DbLoadCategoryById } from '@/data/usecases/category/load-category-by-id/db-load-category-by-id'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'
export const makeDbLoadCategoryById = (): LoadCategoryById => {
  const categorysRepository = new CategorysRepository()
  return new DbLoadCategoryById(categorysRepository)
}
