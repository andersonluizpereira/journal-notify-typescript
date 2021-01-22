import { SkuModel } from '@/domain/models'
import { UpdateSkuRespository, UpdateSkuResult } from './db-update-sku-protocols'

export class DbUpdateSku implements UpdateSkuResult {
  constructor (private readonly updateSkuRespository: UpdateSkuRespository) {}
  async update (data: SkuModel): Promise<SkuModel> {
    const sku = await this.updateSkuRespository.update(data)
    return sku
  }
}
