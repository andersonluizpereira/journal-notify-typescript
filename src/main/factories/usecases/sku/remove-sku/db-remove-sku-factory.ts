import { DbRemoveSku } from '@/data/usecases/sku/remove-sku/db-remove-sku'
import { RemoveSku } from '@/domain/usecases/sku/remove-sku'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

export const makeDbRemoveSku = (): RemoveSku => {
  const skusRepository = new SkusRepository()
  return new DbRemoveSku(skusRepository)
}
