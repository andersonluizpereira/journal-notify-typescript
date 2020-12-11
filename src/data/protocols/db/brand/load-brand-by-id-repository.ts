import { BrandModel } from '@/domain/models/brand/brand'

export interface LoadBrandByIdRepository {
  loadById(id: string): Promise<BrandModel>
}
