import { ProductModel, LoadProductById, LoadProductByIdRepository } from './db-load-product-by-id-protocols'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly loadProductByIdRepository: LoadProductByIdRepository) {}
  async loadById (id: string): Promise<ProductModel> {
    const product = await this.loadProductByIdRepository.loadById(id)
    return product
  }
}
