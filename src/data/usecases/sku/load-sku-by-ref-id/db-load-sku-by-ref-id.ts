import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
import { SkuModel, LoadSkuRefById, LoadSkuByRefIdRepository } from './db-load-sku-by-ref-id-protocols'

export class DbLoadSkuByRefId implements LoadSkuRefById {
  constructor (private readonly loadSkuByIdRepository: LoadSkuByRefIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadByRefId (refId: string): Promise<SkuModel> {
    const cacheKey = `skusRefId:${refId}`
    let skus = await this.loadCache.load<SkuModel>(cacheKey)
    if (!skus) {
      skus = await this.loadSkuByIdRepository.loadByRefId(refId)
      await this.saveCache.save(cacheKey, skus)
    }
    return skus
  }
}
