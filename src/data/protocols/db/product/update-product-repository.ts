import { ProductModel } from '@/domain/models'

export interface UpdateProductRespository {
  update: (product: ProductModel) => Promise<ProductModel>
}
