import { CategoryModel } from '@/domain/models'
import { mockCategoryModel, mockCategoryModels } from '@/domain/test/mock-category/mock-category'
import { AddCategoryParams } from '@/domain/usecases/category/add-category'
import { AddCategoryRepository, LoadCategoryByIdRepository, LoadCategorysRepository, RemoveCategoryRepository, UpdateCategoryRespository } from '../protocols/db/category'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  addCategoryParams: AddCategoryParams

  async add (data: AddCategoryParams): Promise<void> {
    this.addCategoryParams = data
    return Promise.resolve()
  }
}

export class LoadCategoryByIdRepositorySpy implements LoadCategoryByIdRepository {
  categoryModel = mockCategoryModel()
  id: string

  async loadById (id: string): Promise<CategoryModel> {
    this.id = id
    return Promise.resolve(this.categoryModel)
  }
}

export class LoadCategorysRepositorySpy implements LoadCategorysRepository {
  categoryModels = mockCategoryModels()

  async loadAll (): Promise<CategoryModel[]> {
    return Promise.resolve(this.categoryModels)
  }
}

export class RemoveCategoryRepositorySpy implements RemoveCategoryRepository {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRespository {
  categoryModel = mockCategoryModel()
  async update (category: CategoryModel): Promise<CategoryModel> {
    this.categoryModel = category
    return Promise.resolve(this.categoryModel)
  }
}
