import { BrandModel } from '@/domain/models'

export interface UpdateBrandRespository {
  update: (brand: BrandModel) => Promise<BrandModel>
}
