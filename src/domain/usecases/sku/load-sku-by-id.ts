import { SkuModel } from '@/domain/models'

export interface LoadSkuById {
  loadById: (id: string) => Promise<SkuModel>
}
