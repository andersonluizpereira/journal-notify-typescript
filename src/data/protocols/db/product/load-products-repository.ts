import { ProductModel } from '@/domain/models/product/product'

export interface LoadProductsRepository {
  loadAll: () => Promise<ProductModel[]>
}
