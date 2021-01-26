import { SkuModel } from '@/domain/models/sku/sku'
import { mockSkuModel } from '@/domain/test/mock-sku/mock-sku'
import { AddSku, AddSkuParams } from '@/domain/usecases/sku/add-sku'
import { LoadSkuById } from '@/domain/usecases/sku/load-sku-by-id'
import { LoadSkuRefById } from '@/domain/usecases/sku/load-sku-by-ref-id'
import { LoadSkus } from '@/domain/usecases/sku/load-skus'
import { RemoveSku } from '@/domain/usecases/sku/remove-sku'
import { UpdateSkuResult } from '@/domain/usecases/sku/update-sku'

export class AddSkuSpy implements AddSku {
  addSkuParams: AddSkuParams
  skuModel = mockSkuModel()

  async add (data: AddSkuParams): Promise<SkuModel> {
    this.addSkuParams = data
    return Promise.resolve(this.skuModel)
  }
}

export class RemoveSkuSpy implements RemoveSku {
  id: string
  async removeById (id: string): Promise<void> {
    this.id = id
    return Promise.resolve()
  }
}

export class LoadSkusSpy implements LoadSkus {
  skuModels = [].concat(mockSkuModel())
  async load (): Promise<SkuModel[]> {
    return Promise.resolve(this.skuModels)
  }
}

export class LoadSkusByIdSpy implements LoadSkuById {
  skuModel = mockSkuModel()
  id: string

  async loadById (id: string): Promise<SkuModel> {
    this.id = id
    return Promise.resolve(this.skuModel)
  }
}

export class LoadSkusByRefIdSpy implements LoadSkuRefById {
  skuModel = mockSkuModel()
  refId: string

  async loadByRefId (refId: string): Promise<SkuModel> {
    this.refId = refId
    return Promise.resolve(this.skuModel)
  }
}

export class UpdateSkuSpy implements UpdateSkuResult {
  skuModel = mockSkuModel()
  async update (sku: SkuModel): Promise<SkuModel> {
    this.skuModel = sku
    return Promise.resolve(this.skuModel)
  }
}
