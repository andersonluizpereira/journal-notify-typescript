import { AddBrandRepository } from '@/data/protocols/db'
import { LoadBrandByIdRepository } from '@/data/protocols/db/brand/load-brand-by-id-repository'
import { LoadBrandsRepository } from '@/data/protocols/db/brand/load-brands-repository'
import { BrandModel } from '@/domain/models'

import { AddBrandParams } from '@/domain/usecases'
import { getRepository, Repository } from 'typeorm'
import { Brand } from '../../entities/brand'

export class BrandsRepository implements AddBrandRepository, LoadBrandsRepository, LoadBrandByIdRepository {
  private readonly brandsRepository: Repository<Brand>

  constructor () {
    this.brandsRepository = getRepository(Brand)
  }

  async loadAll (accountId?: string): Promise<BrandModel[]> {
    return await this.brandsRepository
      .createQueryBuilder().getMany()
  }

  async loadById (id: string): Promise<Brand> {
    const brand = await this.brandsRepository.findOne({
      where: {
        id
      }
    })
    return brand
  }

  async add (data: AddBrandParams): Promise<void> {
    const brand = this.brandsRepository.create(data)
    await this.brandsRepository.save(brand)
  }
}
