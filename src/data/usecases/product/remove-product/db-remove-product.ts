import { RemoveProduct, RemoveProductRepository } from './db-remove-product-protocols'

export class DbRemoveProduct implements RemoveProduct {
  constructor (private readonly removeProductRepository: RemoveProductRepository) {}
  async removeById (id: string): Promise<void> {
    await this.removeProductRepository.removeById(id)
  }
}
