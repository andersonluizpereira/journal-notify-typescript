import { ProductModel } from '@/domain/models/product/product'

export interface LoadProductByRefIdRepository {
  loadByRefId: (refId: string) => Promise<ProductModel>
}
