import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
import { SkuModel, LoadSkuById, LoadSkuByIdRepository } from './db-load-sku-by-id-protocols'

export class DbLoadSkuById implements LoadSkuById {
  constructor (private readonly loadSkuByIdRepository: LoadSkuByIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadById (id: string): Promise<SkuModel> {
    const cacheKey = `skus:${id}`
    let skus = await this.loadCache.load<SkuModel>(cacheKey)
    if (!skus) {
      skus = await this.loadSkuByIdRepository.loadById(id)
      await this.saveCache.save(cacheKey, skus)
    }
    return skus
  }
}
