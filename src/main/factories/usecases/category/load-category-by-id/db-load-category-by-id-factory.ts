import Redis from 'ioredis'

import { DbLoadCategoryById } from '@/data/usecases/category/load-category-by-id/db-load-category-by-id'
import { LoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { CategorysRepository } from '@/infra/db/typeorm/repositories/category/categorysRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'

export const makeDbLoadCategoryById = (): LoadCategoryById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const categorysRepository = new CategorysRepository()
  return new DbLoadCategoryById(categorysRepository, redisAdapter, redisAdapter)
}
