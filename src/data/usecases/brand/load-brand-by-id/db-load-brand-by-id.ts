import { BrandModel, LoadBrandById, LoadBrandByIdRepository } from './db-load-brand-by-id-protocols'

export class DbLoadBrandById implements LoadBrandById {
  constructor (private readonly loadBrandByIdRepository: LoadBrandByIdRepository) {}
  async loadById (id: string): Promise<BrandModel> {
    const brand = await this.loadBrandByIdRepository.loadById(id)
    return brand
  }
}
