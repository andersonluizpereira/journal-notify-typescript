import Redis from 'ioredis'

import { DbLoadProductByRefId } from '@/data/usecases/product/load-product-by-ref-id/db-load-product-by-ref-id'
import { LoadProductRefById } from '@/domain/usecases/product/load-product-by-ref-id'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'

export const makeDbLoadProductRefById = (): LoadProductRefById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const productsRepository = new ProductsRepository()
  return new DbLoadProductByRefId(productsRepository, redisAdapter, redisAdapter)
}
