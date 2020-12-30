import { ProductModel, LoadProducts, LoadProductsRepository } from './db-load-product-protocols'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) {}
  async load (): Promise<ProductModel[]> {
    const products = await this.loadProductsRepository.loadAll()
    return products
  }
}
