import { BrandModel } from '@/domain/models/brand/brand'

export interface LoadBrandsRepository {
  loadAll(): Promise<BrandModel[]>
}
