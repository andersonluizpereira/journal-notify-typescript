import { DbUpdateProduct } from '@/data/usecases/product/update-product/db-update-product'
import { UpdateProductResult } from '@/domain/usecases/product/update-product'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

export const makeDbUpdateProduct = (): UpdateProductResult => {
  const productsRepository = new ProductsRepository()
  return new DbUpdateProduct(productsRepository)
}
