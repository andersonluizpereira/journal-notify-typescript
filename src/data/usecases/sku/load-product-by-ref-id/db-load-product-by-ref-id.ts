import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
import { ProductModel, LoadProductRefById, LoadProductByRefIdRepository } from './db-load-product-by-ref-id-protocols'

export class DbLoadProductByRefId implements LoadProductRefById {
  constructor (private readonly loadProductByIdRepository: LoadProductByRefIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadByRefId (refId: string): Promise<ProductModel> {
    const cacheKey = `productsRefId:${refId}`
    let products = await this.loadCache.load<ProductModel>(cacheKey)
    if (!products) {
      products = await this.loadProductByIdRepository.loadByRefId(refId)
      await this.saveCache.save(cacheKey, products)
    }
    return products
  }
}
