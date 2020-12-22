import { DbAddCategory } from '@/data/usecases/category/add-category/db-add-category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'

export const makeDbAddCategory = (): AddCategory => {
  const categorysRepository = new CategorysRepository()
  return new DbAddCategory(categorysRepository)
}
