import { SkuModel } from '@/domain/models'
import { AddSku, AddSkuRepository, AddSkuParams } from './db-add-sku-protocols'

export class DbAddSku implements AddSku {
  constructor (private readonly addSkuRepository: AddSkuRepository) {}
  async add (data: AddSkuParams): Promise<SkuModel> {
    return await this.addSkuRepository.add(data)
  }
}
