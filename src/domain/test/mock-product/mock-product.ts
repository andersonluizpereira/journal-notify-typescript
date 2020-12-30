import { ProductModel } from '@/domain/models'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import faker from 'faker'

export const mockProductModel = (): ProductModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    departmentId: faker.random.uuid(),
    categoryId: faker.random.uuid(),
    brandId: faker.random.uuid(),
    linkId: faker.random.word(),
    refId: faker.random.word(),
    isVisible: faker.random.boolean(),
    description: faker.random.word(),
    descriptionShort: faker.random.word(),
    releaseDate: new Date(),
    keyWords: faker.random.word(),
    title: faker.random.word(),
    isActive: faker.random.boolean(),
    taxCode: faker.random.number(),
    metaTagDescription: faker.random.word(),
    supplierId: faker.random.number(),
    showWithoutStock: faker.random.boolean(),
    score: faker.random.number()
  }
}

export const mockProductModels = (): ProductModel[] => [
  mockProductModel(),
  mockProductModel()
]

export const mockAddProductParams = (): AddProductParams => ({
  name: faker.name.findName(),
  departmentId: faker.random.uuid(),
  categoryId: faker.random.uuid(),
  brandId: faker.random.uuid(),
  linkId: faker.random.word(),
  refId: faker.random.word(),
  isVisible: faker.random.boolean(),
  description: faker.random.word(),
  descriptionShort: faker.random.word(),
  releaseDate: new Date(),
  keyWords: faker.random.word(),
  title: faker.random.word(),
  isActive: faker.random.boolean(),
  taxCode: faker.random.number(),
  metaTagDescription: faker.random.word(),
  supplierId: faker.random.number(),
  showWithoutStock: faker.random.boolean(),
  score: faker.random.number()
})
