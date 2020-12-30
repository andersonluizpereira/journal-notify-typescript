import { ProductModel } from '@/domain/models'

export type AddProductParams = Omit<ProductModel, 'id'>

export interface AddProduct {
  add: (Product: AddProductParams) => Promise<ProductModel>
}
