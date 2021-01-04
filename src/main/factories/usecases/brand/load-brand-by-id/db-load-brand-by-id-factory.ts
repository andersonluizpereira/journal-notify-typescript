import Redis from 'ioredis'

import { DbLoadBrandById } from '@/data/usecases/brand/load-brand-by-id/db-load-brand-by-id'
import { LoadBrandById } from '@/domain/usecases/brand/load-brand-by-id'
import { BrandsRepository } from '@/infra/db/typeorm/repositories/brand/brandsRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'
export const makeDbLoadBrandById = (): LoadBrandById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const brandsRepository = new BrandsRepository()
  return new DbLoadBrandById(brandsRepository, redisAdapter, redisAdapter)
}
