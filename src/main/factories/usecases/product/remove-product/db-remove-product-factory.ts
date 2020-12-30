import { DbRemoveProduct } from '@/data/usecases/product/remove-product/db-remove-product'
import { RemoveProduct } from '@/domain/usecases/product/remove-product'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

export const makeDbRemoveProduct = (): RemoveProduct => {
  const productsRepository = new ProductsRepository()
  return new DbRemoveProduct(productsRepository)
}
