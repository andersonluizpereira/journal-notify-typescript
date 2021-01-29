import { DbUpdateSku } from '@/data/usecases/sku/update-sku/db-update-sku'
import { UpdateSkuResult } from '@/domain/usecases/sku/update-sku'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

export const makeDbUpdateSku = (): UpdateSkuResult => {
  const skusRepository = new SkusRepository()
  return new DbUpdateSku(skusRepository)
}
