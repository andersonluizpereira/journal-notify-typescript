import { CategoryModel } from '@/domain/models'
import { AddCategoryParams } from '@/domain/usecases/category/add-category'
import faker from 'faker'

export const mockCategoryModel = (): CategoryModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    keywords: faker.random.word(),
    title: faker.random.word(),
    description: faker.random.word(),
    fatherCategoryId: faker.random.number(),
    globalCategoryId: faker.random.number(),
    showInStoreFront: faker.random.boolean(),
    isActive: faker.random.boolean(),
    activeStoreFrontLink: faker.random.boolean(),
    showBrandFilter: faker.random.boolean(),
    score: faker.random.number(),
    stockKeepingUnitSelectionMode: faker.random.word()
  }
}

export const mockCategoryModels = (): CategoryModel[] => [
  mockCategoryModel(),
  mockCategoryModel()
]

export const mockAddCategoryParams = (): AddCategoryParams => ({
  name: faker.name.findName(),
  keywords: faker.random.word(),
  title: faker.random.word(),
  description: faker.random.word(),
  fatherCategoryId: faker.random.number(),
  globalCategoryId: faker.random.number(),
  showInStoreFront: faker.random.boolean(),
  isActive: faker.random.boolean(),
  activeStoreFrontLink: faker.random.boolean(),
  showBrandFilter: faker.random.boolean(),
  score: faker.random.number(),
  stockKeepingUnitSelectionMode: faker.random.word()
})
