import { ProductModel } from '@/domain/models'

export interface LoadProductRefById {
  loadByRefId: (refId: string) => Promise<ProductModel>
}
