import { CategoryModel, LoadCategorys, LoadCategorysRepository } from './db-load-category-protocols'

export class DbLoadCategorys implements LoadCategorys {
  constructor (private readonly loadCategorysRepository: LoadCategorysRepository) {}
  async load (): Promise<CategoryModel[]> {
    const categorys = await this.loadCategorysRepository.loadAll()
    return categorys
  }
}
