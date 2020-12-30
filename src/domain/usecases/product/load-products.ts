import { ProductModel } from '@/domain/models'

export interface LoadProducts {
  load: () => Promise<ProductModel[]>
}
