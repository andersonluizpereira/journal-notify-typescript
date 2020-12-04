import { BrandModel } from '@/domain/models'

export type AddBrandParams = Omit<BrandModel, 'id'>

export interface AddBrand {
  add(brand: AddBrandParams): Promise<void>
}
