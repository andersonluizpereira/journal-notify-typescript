import Redis from 'ioredis'

import { DbLoadProductById } from '@/data/usecases/product/load-product-by-id/db-load-product-by-id'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductsRepository } from '@/infra/db/typeorm/repositories/product/productsRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'

export const makeDbLoadProductById = (): LoadProductById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const productsRepository = new ProductsRepository()
  return new DbLoadProductById(productsRepository, redisAdapter, redisAdapter)
}
