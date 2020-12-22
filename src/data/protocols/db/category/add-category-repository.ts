import { AddCategoryParams } from '@/domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add: (data: AddCategoryParams) => Promise<void>
}
