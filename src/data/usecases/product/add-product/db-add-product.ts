import { ProductModel } from '@/domain/models'
import { AddProduct, AddProductRepository, AddProductParams } from './db-add-product-protocols'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) {}
  async add (data: AddProductParams): Promise<ProductModel> {
    return await this.addProductRepository.add(data)
  }
}
