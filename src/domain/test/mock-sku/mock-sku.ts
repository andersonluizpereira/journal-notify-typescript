import { SkuModel } from '@/domain/models'
import { AddSkuParams } from '@/domain/usecases/sku/add-sku'
import faker from 'faker'

export const mockSkuModel = (): SkuModel => {
  return {
    id: faker.random.uuid(),
    productId: faker.random.uuid(),
    isActive: faker.random.boolean(),
    name: faker.random.word(),
    refId: faker.random.word(),
    packagedHeight: faker.random.number(),
    packagedLength: faker.random.number(),
    packagedWidth: faker.random.number(),
    packagedWeightKg: faker.random.number(),
    height: faker.random.number(),
    length: faker.random.number(),
    width: faker.random.number(),
    weightKg: faker.random.number(),
    cubicWeight: faker.random.number(),
    isKit: faker.random.boolean(),
    rewardValue: faker.random.number(),
    manufacturerCode: faker.random.number(),
    commercialConditionId: faker.random.number(),
    measurementUnit: faker.random.word(),
    unitMultiplier: faker.random.number(),
    kitItensSellApart: faker.random.boolean()
  }
}

export const mockSkuModels = (): SkuModel[] => [
  mockSkuModel(),
  mockSkuModel()
]

export const mockAddSkuParams = (): AddSkuParams => ({
  productId: faker.random.uuid(),
  isActive: faker.random.boolean(),
  name: faker.random.word(),
  refId: faker.random.word(),
  packagedHeight: faker.random.number(),
  packagedLength: faker.random.number(),
  packagedWidth: faker.random.number(),
  packagedWeightKg: faker.random.number(),
  height: faker.random.number(),
  length: faker.random.number(),
  width: faker.random.number(),
  weightKg: faker.random.number(),
  cubicWeight: faker.random.number(),
  isKit: faker.random.boolean(),
  rewardValue: faker.random.number(),
  manufacturerCode: faker.random.number(),
  commercialConditionId: faker.random.number(),
  measurementUnit: faker.random.word(),
  unitMultiplier: faker.random.number(),
  kitItensSellApart: faker.random.boolean()
})
