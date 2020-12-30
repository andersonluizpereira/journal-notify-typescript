import { DbLoadProducts } from '@/data/usecases/product/load-product/db-load-product'
import { LoadProducts } from '@/domain/usecases/product/load-products'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

export const makeDbLoadProductResult = (): LoadProducts => {
  const productsRepository = new ProductsRepository()
  return new DbLoadProducts(productsRepository)
}
