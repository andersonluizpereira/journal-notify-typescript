import { ProductModel } from '@/domain/models'
import { UpdateProductRespository, UpdateProductResult } from './db-update-product-protocols'

export class DbUpdateProduct implements UpdateProductResult {
  constructor (private readonly updateProductRespository: UpdateProductRespository) {}
  async update (data: ProductModel): Promise<ProductModel> {
    const product = await this.updateProductRespository.update(data)
    return product
  }
}
