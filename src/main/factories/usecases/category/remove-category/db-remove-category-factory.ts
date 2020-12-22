import { DbRemoveCategory } from '@/data/usecases/category/remove-category/db-remove-category'
import { RemoveCategory } from '@/domain/usecases/category/remove-category'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'

export const makeDbRemoveCategory = (): RemoveCategory => {
  const categorysRepository = new CategorysRepository()
  return new DbRemoveCategory(categorysRepository)
}
