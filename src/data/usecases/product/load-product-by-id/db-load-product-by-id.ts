import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
import { ProductModel, LoadProductById, LoadProductByIdRepository } from './db-load-product-by-id-protocols'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly loadProductByIdRepository: LoadProductByIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadById (id: string): Promise<ProductModel> {
    const cacheKey = `products:${id}`
    let products = await this.loadCache.load<ProductModel>(cacheKey)
    if (!products) {
      products = await this.loadProductByIdRepository.loadById(id)
      await this.saveCache.save(cacheKey, products)
    }
    return products
  }
}
