import { BrandModel, LoadBrands, LoadBrandsRepository } from './db-load-brand-protocols'

export class DbLoadBrands implements LoadBrands {
  constructor (private readonly loadBrandsRepository: LoadBrandsRepository) {}
  async load (): Promise<BrandModel[]> {
    const brands = await this.loadBrandsRepository.loadAll()
    return brands
  }
}
