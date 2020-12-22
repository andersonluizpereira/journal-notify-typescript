import { CategoryModel } from '@/domain/models'

export interface UpdateCategoryRespository {
  update: (category: CategoryModel) => Promise<CategoryModel>
}
