import { SkuModel } from '@/domain/models/sku/sku'

export interface LoadSkuByRefIdRepository {
  loadByRefId: (refId: string) => Promise<SkuModel>
}
