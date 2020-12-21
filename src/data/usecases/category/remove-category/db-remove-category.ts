import { RemoveCategory, RemoveCategoryRepository } from './db-remove-category-protocols'

export class DbRemoveCategory implements RemoveCategory {
  constructor (private readonly removeCategoryRepository: RemoveCategoryRepository) {}
  async removeById (id: string): Promise<void> {
    await this.removeCategoryRepository.removeById(id)
  }
}
