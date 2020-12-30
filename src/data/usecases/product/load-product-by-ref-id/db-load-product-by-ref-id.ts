import { ProductModel, LoadProductRefById, LoadProductByRefIdRepository } from './db-load-product-by-ref-id-protocols'

export class DbLoadProductByRefId implements LoadProductRefById {
  constructor (private readonly loadProductByIdRepository: LoadProductByRefIdRepository) {}
  async loadByRefId (refId: string): Promise<ProductModel> {
    const product = await this.loadProductByIdRepository.loadByRefId(refId)
    return product
  }
}
