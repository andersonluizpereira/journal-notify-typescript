import { CategoryModel } from '@/domain/models'
import { UpdateCategoryRespository, UpdateCategoryResult } from './db-update-category-protocols'

export class DbUpdateCategory implements UpdateCategoryResult {
  constructor (private readonly updateCategoryRespository: UpdateCategoryRespository) {}
  async update (data: CategoryModel): Promise<CategoryModel> {
    const category = await this.updateCategoryRespository.update(data)
    return category
  }
}
