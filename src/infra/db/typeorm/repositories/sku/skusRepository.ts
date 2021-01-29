import { AddSkuRepository, LoadSkuByRefIdRepository, RemoveSkuRepository, UpdateSkuRespository } from '@/data/protocols/db/sku'
import { LoadSkuByIdRepository } from '@/data/protocols/db/sku/load-sku-by-id-repository'
import { LoadSkusRepository } from '@/data/protocols/db/sku/load-skus-repository'
import { SkuModel } from '@/domain/models'
import { AddSkuParams } from '@/domain/usecases/sku/add-sku'

import { getRepository, Repository } from 'typeorm'
import { Sku } from '../../entities/sku'

export class SkusRepository implements AddSkuRepository, LoadSkusRepository, LoadSkuByIdRepository, LoadSkuByRefIdRepository, RemoveSkuRepository, UpdateSkuRespository {
  private readonly skusRepository: Repository<Sku>

  constructor () {
    this.skusRepository = getRepository(Sku)
  }

  async loadAll (SkuId?: string): Promise<SkuModel[]> {
    return await this.skusRepository
      .createQueryBuilder().getMany()
  }

  async loadById (id: string): Promise<Sku> {
    const sku = await this.skusRepository.findOne({
      where: {
        id
      }
    })
    return sku
  }

  async loadByRefId (refId: string): Promise<Sku> {
    const sku = await this.skusRepository.findOne({
      where: {
        refId
      }
    })
    return sku
  }

  async add (data: AddSkuParams): Promise<SkuModel> {
    const sku = this.skusRepository.create(data)
    await this.skusRepository.save(sku)
    return sku
  }

  async removeById (id: string): Promise<void> {
    const sku = await this.skusRepository.findOne({
      where: {
        id
      }
    })
    await this.skusRepository.remove(sku)
  }

  async update (sku: SkuModel): Promise<SkuModel> {
    await this.skusRepository.merge(sku)
    return await this.skusRepository.save(sku)
  }
}
