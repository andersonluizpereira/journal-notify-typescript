import { DbLoadProductByRefId } from '@/data/usecases/product/load-product-by-ref-id/db-load-product-by-ref-id'
import { LoadProductRefById } from '@/domain/usecases/product/load-product-by-ref-id'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'
export const makeDbLoadProductRefById = (): LoadProductRefById => {
  const productsRepository = new ProductsRepository()
  return new DbLoadProductByRefId(productsRepository)
}
