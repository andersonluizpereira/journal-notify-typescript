import { SkuModel } from '@/domain/models'

export interface LoadSkus {
  load: () => Promise<SkuModel[]>
}
