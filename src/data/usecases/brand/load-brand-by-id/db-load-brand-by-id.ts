import { BrandModel, LoadBrandById, LoadBrandByIdRepository } from './db-load-brand-by-id-protocols'
import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
export class DbLoadBrandById implements LoadBrandById {
  constructor (private readonly loadBrandByIdRepository: LoadBrandByIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadById (id: string): Promise<BrandModel> {
    const cacheKey = `brands:${id}`
    let brands = await this.loadCache.load<BrandModel>(cacheKey)
    if (!brands) {
      brands = await this.loadBrandByIdRepository.loadById(id)
      await this.saveCache.save(cacheKey, brands)
    }
    return brands
  }
}
