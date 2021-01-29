import { DbLoadSkus } from '@/data/usecases/sku/load-sku/db-load-sku'
import { LoadSkus } from '@/domain/usecases/sku/load-skus'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

export const makeDbLoadSkuResult = (): LoadSkus => {
  const skusRepository = new SkusRepository()
  return new DbLoadSkus(skusRepository)
}
