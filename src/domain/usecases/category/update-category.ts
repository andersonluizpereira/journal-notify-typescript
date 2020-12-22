import { CategoryModel } from '@/domain/models'

export interface UpdateCategoryResult {
  update: (account: CategoryModel) => Promise<CategoryModel>
}
