import { CategoryModel } from '@/domain/models/category/category'

export interface LoadCategorys {
  load: () => Promise<CategoryModel[]>
}
