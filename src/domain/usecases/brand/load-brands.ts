import { BrandModel } from '@/domain/models/brand/brand'

export interface LoadBrands {
  load (): Promise<BrandModel[]>
}
