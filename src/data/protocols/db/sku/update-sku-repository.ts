import { SkuModel } from '@/domain/models'

export interface UpdateSkuRespository {
  update: (sku: SkuModel) => Promise<SkuModel>
}
