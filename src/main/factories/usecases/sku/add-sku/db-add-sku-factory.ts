import { DbAddSku } from '@/data/usecases/sku/add-sku/db-add-sku'
import { AddSku } from '@/domain/usecases/sku/add-sku'
import { SkusRepository } from '@/infra/db/typeorm/repositories/sku/skusRepository'

export const makeDbAddSku = (): AddSku => {
  const skusRepository = new SkusRepository()
  return new DbAddSku(skusRepository)
}
