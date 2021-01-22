import { RemoveSku, RemoveSkuRepository } from './db-remove-sku-protocols'

export class DbRemoveSku implements RemoveSku {
  constructor (private readonly removeSkuRepository: RemoveSkuRepository) {}
  async removeById (id: string): Promise<void> {
    await this.removeSkuRepository.removeById(id)
  }
}
