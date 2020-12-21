import { CategoryModel, LoadCategoryById, LoadCategoryByIdRepository } from './db-load-category-by-id-protocols'

export class DbLoadCategoryById implements LoadCategoryById {
  constructor (private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository) {}
  async loadById (id: string): Promise<CategoryModel> {
    const category = await this.loadCategoryByIdRepository.loadById(id)
    return category
  }
}
