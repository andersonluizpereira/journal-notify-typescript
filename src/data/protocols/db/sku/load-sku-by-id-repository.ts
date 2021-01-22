import { SkuModel } from '@/domain/models/sku/sku'

export interface LoadSkuByIdRepository {
  loadById: (id: string) => Promise<SkuModel>
}
