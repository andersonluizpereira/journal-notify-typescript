import { SkuModel } from '@/domain/models'

export type AddSkuParams = Omit<SkuModel, 'id'>

export interface AddSku {
  add: (Sku: AddSkuParams) => Promise<SkuModel>
}
