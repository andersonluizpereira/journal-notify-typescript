import { ProductModel } from '@/domain/models'

export interface LoadProductById {
  loadById: (id: string) => Promise<ProductModel>
}
