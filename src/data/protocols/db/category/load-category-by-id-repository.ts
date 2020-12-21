import { CategoryModel } from '@/domain/models/category/category'

export interface LoadCategoryByIdRepository {
  loadById: (id: string) => Promise<CategoryModel>
}
