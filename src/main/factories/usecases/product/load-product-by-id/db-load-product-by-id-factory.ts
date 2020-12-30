import { DbLoadProductById } from '@/data/usecases/product/load-product-by-id/db-load-product-by-id'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'
export const makeDbLoadProductById = (): LoadProductById => {
  const productsRepository = new ProductsRepository()
  return new DbLoadProductById(productsRepository)
}
