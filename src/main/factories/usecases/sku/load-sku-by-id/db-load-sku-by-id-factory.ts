import Redis from 'ioredis'

import { DbLoadSkuById } from '@/data/usecases/sku/load-sku-by-id/db-load-sku-by-id'
import { LoadSkuById } from '@/domain/usecases/sku/load-sku-by-id'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'

export const makeDbLoadSkuById = (): LoadSkuById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const skusRepository = new SkusRepository()
  return new DbLoadSkuById(skusRepository, redisAdapter, redisAdapter)
}
