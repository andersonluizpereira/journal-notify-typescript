import { CategoryModel } from '@/domain/models/category/category'

export interface LoadCategorysRepository {
  loadAll: () => Promise<CategoryModel[]>
}
