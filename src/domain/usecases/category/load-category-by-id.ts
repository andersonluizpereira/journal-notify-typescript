import { CategoryModel } from '@/domain/models/category/category'

export interface LoadCategoryById {
  loadById: (id: string) => Promise<CategoryModel>
}
