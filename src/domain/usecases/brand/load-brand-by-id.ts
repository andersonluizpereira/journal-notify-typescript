import { BrandModel } from '@/domain/models/brand/brand'

export interface LoadBrandById {
  loadById: (id: string) => Promise<BrandModel>
}
