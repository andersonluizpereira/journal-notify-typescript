import { CategoryModel } from '@/domain/models/category/category'
import { mockCategoryModel } from '@/domain/test/mock-category/mock-category'
import { AddCategory, AddCategoryParams } from '@/domain/usecases/category/add-category'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { LoadCategorys } from '@/domain/usecases/category/load-categorys'
import { RemoveCategory } from '@/domain/usecases/category/remove-category'
import { UpdateCategoryResult } from '@/domain/usecases/category/update-category'

export class AddCategorySpy implements AddCategory {
  addCategoryParams: AddCategoryParams

  async add (data: AddCategoryParams): Promise<void> {
    this.addCategoryParams = data
    return Promise.resolve()
  }
}

export class RemoveCategorySpy implements RemoveCategory {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class LoadCategorysSpy implements LoadCategorys {
  categoryModels = [].concat(mockCategoryModel())
  async load (): Promise<CategoryModel[]> {
    return Promise.resolve(this.categoryModels)
  }
}

export class LoadCategorysByIdSpy implements LoadCategoryById {
  categoryModel = mockCategoryModel()
  id: string

  async loadById (id: string): Promise<CategoryModel> {
    this.id = id
    return Promise.resolve(this.categoryModel)
  }
}

export class UpdateCategorySpy implements UpdateCategoryResult {
  categoryModel = mockCategoryModel()
  async update (category: CategoryModel): Promise<CategoryModel> {
    this.categoryModel = category
    return Promise.resolve(this.categoryModel)
  }
}
