import { BrandModel } from '@/domain/models'
import { UpdateBrandRespository, UpdateBrandResult } from './db-update-brand-protocols'

export class DbUpdateBrand implements UpdateBrandResult {
  constructor (private readonly updateBrandRespository: UpdateBrandRespository) {}
  async update (data: BrandModel): Promise<BrandModel> {
    const brand = await this.updateBrandRespository.update(data)
    return brand
  }
}
