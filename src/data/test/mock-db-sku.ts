import { SkuModel } from '@/domain/models'
import { mockSkuModel, mockSkuModels } from '@/domain/test/mock-sku/mock-sku'
import { AddSkuParams } from '@/domain/usecases/sku/add-sku'
import { AddSkuRepository, LoadSkuByIdRepository, LoadSkuByRefIdRepository, LoadSkusRepository, RemoveSkuRepository, UpdateSkuRespository } from '../protocols/db/sku'

export class AddSkuRepositorySpy implements AddSkuRepository {
  skuModel = mockSkuModel()
  addSkuParams: AddSkuParams

  async add (data: AddSkuParams): Promise<SkuModel> {
    this.addSkuParams = data
    return Promise.resolve(this.skuModel)
  }
}

export class LoadSkuByRefIdRepositorySpy implements LoadSkuByRefIdRepository {
  skuModel = mockSkuModel()
  id: string

  async loadByRefId (refId: string): Promise<SkuModel> {
    this.id = refId
    return Promise.resolve(this.skuModel)
  }
}

export class LoadSkuByIdRepositorySpy implements LoadSkuByIdRepository {
  skuModel = mockSkuModel()
  id: string

  async loadById (id: string): Promise<SkuModel> {
    this.id = id
    return Promise.resolve(this.skuModel)
  }
}

export class LoadSkusRepositorySpy implements LoadSkusRepository {
  skuModels = mockSkuModels()

  async loadAll (): Promise<SkuModel[]> {
    return Promise.resolve(this.skuModels)
  }
}

export class RemoveSkuRepositorySpy implements RemoveSkuRepository {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class UpdateSkuRepositorySpy implements UpdateSkuRespository {
  skuModel = mockSkuModel()
  async update (sku: SkuModel): Promise<SkuModel> {
    this.skuModel = sku
    return Promise.resolve(this.skuModel)
  }
}
