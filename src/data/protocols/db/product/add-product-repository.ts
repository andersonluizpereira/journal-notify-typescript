import { ProductModel } from '@/domain/models/product/product'
import { AddProductParams } from '@/domain/usecases/product/add-product'

export interface AddProductRepository {
  add: (data: AddProductParams) => Promise<ProductModel>
}
