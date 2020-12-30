import { ProductModel } from '@/domain/models'

export interface UpdateProductResult {
  update: (account: ProductModel) => Promise<ProductModel>
}
