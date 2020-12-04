import { BrandModel } from '@/domain/models'
import { AddBrandParams } from '@/domain/usecases'
import faker from 'faker'

export const mockBrandModel = (): BrandModel => {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    title: faker.random.word(),
    description: faker.random.word(),
    keywords: faker.random.word(),
    isActive: faker.random.boolean(),
    adWordsRemarketingCode: faker.random.word(),
    lomadeeCampaignCode: faker.random.word()
  }
}

export const mockBrandModels = (): BrandModel[] => [
  mockBrandModel(),
  mockBrandModel()
]

export const mockAddBrandParams = (): AddBrandParams => ({
  name: faker.name.findName(),
  title: faker.random.word(),
  description: faker.random.word(),
  keywords: faker.random.word(),
  isActive: faker.random.boolean(),
  adWordsRemarketingCode: faker.random.word(),
  lomadeeCampaignCode: faker.random.word()
})
