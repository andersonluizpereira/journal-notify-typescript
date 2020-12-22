import { AddCategory, AddCategoryRepository, AddCategoryParams } from './db-add-category-protocols'

export class DbAddCategory implements AddCategory {
  constructor (private readonly addCategoryRepository: AddCategoryRepository) {}
  async add (data: AddCategoryParams): Promise<void> {
    await this.addCategoryRepository.add(data)
  }
}
