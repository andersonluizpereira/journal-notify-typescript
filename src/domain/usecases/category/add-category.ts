import { CategoryModel } from '@/domain/models'

export type AddCategoryParams = Omit<CategoryModel, 'id'>

export interface AddCategory {
  add: (Category: AddCategoryParams) => Promise<void>
}
