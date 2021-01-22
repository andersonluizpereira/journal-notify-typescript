import { CategoryModel, LoadCategoryById, LoadCategoryByIdRepository } from './db-load-category-by-id-protocols'
import { ILoadCache } from '@/data/protocols/cache/iLoadCache'
import { ISaveCache } from '@/data/protocols/cache/iSaveCache'
export class DbLoadCategoryById implements LoadCategoryById {
  constructor (private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository, private readonly loadCache: ILoadCache, private readonly saveCache: ISaveCache) {}
  async loadById (id: string): Promise<CategoryModel> {
    const cacheKey = `categorys:${id}`
    let categorys = await this.loadCache.load<CategoryModel>(cacheKey)
    if (!categorys) {
      categorys = await this.loadCategoryByIdRepository.loadById(id)
      await this.saveCache.save(cacheKey, categorys)
    }
    return categorys
  }
}
