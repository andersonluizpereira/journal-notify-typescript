import { ProductModel } from '@/domain/models/product/product'

export interface LoadProductByIdRepository {
  loadById: (id: string) => Promise<ProductModel>
}
