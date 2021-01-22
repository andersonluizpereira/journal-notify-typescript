import { SkuModel } from '@/domain/models/sku/sku'

export interface LoadSkusRepository {
  loadAll: () => Promise<SkuModel[]>
}
