import { AddBrandRepository } from '../protocols/db'
import { AddBrandParams } from '@/domain/usecases/brand/add-brand'
import { LoadBrandByIdRepository } from '../protocols/db/brand/load-brand-by-id-repository'
import { BrandModel } from '@/domain/models/brand/brand'
import { mockBrandModel, mockBrandModels } from '@/domain/test/mock-brand/mock-brand'
import { LoadBrandsRepository } from '../usecases/brand/load-brand/db-load-brand-protocols'

export class AddBrandRepositorySpy implements AddBrandRepository {
  addBrandParams: AddBrandParams

  async add (data: AddBrandParams): Promise<void> {
    this.addBrandParams = data
    return Promise.resolve()
  }
}

export class LoadBrandByIdRepositorySpy implements LoadBrandByIdRepository {
  brandModel = mockBrandModel()
  id: string

  async loadById (id: string): Promise<BrandModel> {
    this.id = id
    return Promise.resolve(this.brandModel)
  }
}

export class LoadBrandsRepositorySpy implements LoadBrandsRepository {
  brandModels = mockBrandModels()

  async loadAll (): Promise<BrandModel[]> {
    return Promise.resolve(this.brandModels)
  }
}
