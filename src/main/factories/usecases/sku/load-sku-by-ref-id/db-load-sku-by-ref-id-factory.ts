import Redis from 'ioredis'

import { DbLoadSkuByRefId } from '@/data/usecases/sku/load-sku-by-ref-id/db-load-sku-by-ref-id'
import { LoadSkuRefById } from '@/domain/usecases/sku/load-sku-by-ref-id'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

import { RedisAdapter } from '@/infra/cache/redisAdapter/redisAdapter'

import cacheConfig from '@/main/config/cache'

export const makeDbLoadSkuRefById = (): LoadSkuRefById => {
  const redisAdapter = new RedisAdapter(new Redis(cacheConfig))
  const skusRepository = new SkusRepository()
  return new DbLoadSkuByRefId(skusRepository, redisAdapter, redisAdapter)
}
