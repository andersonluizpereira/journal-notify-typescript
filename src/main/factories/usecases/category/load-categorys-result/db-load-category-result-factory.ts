import { DbLoadCategorys } from '@/data/usecases/category/load-category/db-load-category'
import { LoadCategorys } from '@/domain/usecases/category/load-categorys'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'

export const makeDbLoadCategoryResult = (): LoadCategorys => {
  const categorysRepository = new CategorysRepository()
  return new DbLoadCategorys(categorysRepository)
}
