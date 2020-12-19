import { BrandModel } from '@/domain/models/brand/brand'
import { mockBrandModel } from '@/domain/test'
import { AddBrand, AddBrandParams } from '@/domain/usecases/brand/add-brand'
import { LoadBrandById } from '@/domain/usecases/brand/load-brand-by-id'
import { LoadBrands } from '@/domain/usecases/brand/load-brands'
import { RemoveBrand } from '@/domain/usecases/brand/remove-brand'
import { UpdateBrandResult } from '@/domain/usecases/brand/update-brand'

export class AddBrandSpy implements AddBrand {
  addBrandParams: AddBrandParams

  async add (data: AddBrandParams): Promise<void> {
    this.addBrandParams = data
    return Promise.resolve()
  }
}

export class RemoveBrandSpy implements RemoveBrand {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
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

export class UpdateBrandSpy implements UpdateBrandResult {
  brandModel = mockBrandModel()
  async update (brand: BrandModel): Promise<BrandModel> {
    this.brandModel = brand
    return Promise.resolve(this.brandModel)
  }
}
