import { AddBrandRepository } from '../protocols/db'
import { AddBrandParams } from '@/domain/usecases/brand/add-brand'
import { LoadBrandByIdRepository } from '../protocols/db/brand/load-brand-by-id-repository'
import { BrandModel } from '@/domain/models/brand/brand'
import { mockBrandModel } from '@/domain/test/mock-brand/mock-brand'

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
