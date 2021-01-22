import { SkuModel } from '@/domain/models/sku/sku'
import { AddSkuParams } from '@/domain/usecases/sku/add-sku'

export interface AddSkuRepository {
  add: (data: AddSkuParams) => Promise<SkuModel>
}
