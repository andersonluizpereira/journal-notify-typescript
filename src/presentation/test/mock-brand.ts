import { BrandModel } from '@/domain/models/brand/brand'
import { mockBrandModel } from '@/domain/test'
import { AddBrand, AddBrandParams } from '@/domain/usecases/brand/add-brand'
import { LoadBrandById } from '@/domain/usecases/brand/load-brand-by-id'
import { LoadBrands } from '@/domain/usecases/brand/load-brands'

export class AddBrandSpy implements AddBrand {
  addBrandParams: AddBrandParams

  async add (data: AddBrandParams): Promise<void> {
    this.addBrandParams = data
    return Promise.resolve()
  }
}

export class LoadBrandsSpy implements LoadBrands {
  brandModels = [].concat(mockBrandModel())
  async load (): Promise<BrandModel[]> {
    return Promise.resolve(this.brandModels)
  }
}

export class LoadBrandsByIdSpy implements LoadBrandById {
  brandModel = mockBrandModel()
  id: string

  async loadById (id: string): Promise<BrandModel> {
    this.id = id
    return Promise.resolve(this.brandModel)
  }
}
