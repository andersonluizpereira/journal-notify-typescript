import { SkuModel, LoadSkus, LoadSkusRepository } from './db-load-sku-protocols'

export class DbLoadSkus implements LoadSkus {
  constructor (private readonly loadSkusRepository: LoadSkusRepository) {}
  async load (): Promise<SkuModel[]> {
    const skus = await this.loadSkusRepository.loadAll()
    return skus
  }
}
