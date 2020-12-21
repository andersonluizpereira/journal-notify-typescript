import { AddCategoryRepository, RemoveCategoryRepository, UpdateCategoryRespository } from '@/data/protocols/db/category'
import { LoadCategoryByIdRepository } from '@/data/protocols/db/category/load-category-by-id-repository'
import { LoadCategorysRepository } from '@/data/protocols/db/category/load-categorys-repository'
import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases/category/add-category'

import { getRepository, Repository } from 'typeorm'
import { Category } from '../../entities/category'

export class CategorysRepository implements AddCategoryRepository, LoadCategorysRepository, LoadCategoryByIdRepository, RemoveCategoryRepository, UpdateCategoryRespository {
  private readonly categorysRepository: Repository<Category>

  constructor () {
    this.categorysRepository = getRepository(Category)
  }

  async loadAll (categoryId?: string): Promise<CategoryModel[]> {
    return await this.categorysRepository
      .createQueryBuilder().getMany()
  }

  async loadById (id: string): Promise<Category> {
    const category = await this.categorysRepository.findOne({
      where: {
        id
      }
    })
    return category
  }

  async add (data: AddCategoryParams): Promise<void> {
    const category = this.categorysRepository.create(data)
    await this.categorysRepository.save(category)
  }

  async removeById (id: string): Promise<void> {
    const category = await this.categorysRepository.findOne({
      where: {
        id
      }
    })
    await this.categorysRepository.remove(category)
  }

  async update (category: CategoryModel): Promise<CategoryModel> {
    await this.categorysRepository.merge(category)
    return await this.categorysRepository.save(category)
  }
}
