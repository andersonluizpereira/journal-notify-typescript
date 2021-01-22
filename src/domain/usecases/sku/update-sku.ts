import { SkuModel } from '@/domain/models'

export interface UpdateSkuResult {
  update: (account: SkuModel) => Promise<SkuModel>
}
