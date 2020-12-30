import { DbAddProduct } from '@/data/usecases/product/add-product/db-add-product'
import { AddProduct } from '@/domain/usecases/product/add-product'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

export const makeDbAddProduct = (): AddProduct => {
  const productsRepository = new ProductsRepository()
  return new DbAddProduct(productsRepository)
}
