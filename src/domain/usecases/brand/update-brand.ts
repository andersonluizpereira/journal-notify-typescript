import { BrandModel } from '@/domain/models'

export interface UpdateBrandResult {
  update: (account: BrandModel) => Promise<BrandModel>
}
