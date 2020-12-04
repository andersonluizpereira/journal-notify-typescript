import { AddBrandRepository } from '@/data/protocols/db'
import { AddBrandParams } from '@/domain/usecases'
import { getRepository, Repository } from 'typeorm'
import { Brand } from '../../entities/brand'

export class BrandsRepository implements AddBrandRepository {
  private readonly brandsRepository: Repository<Brand>

  constructor () {
    this.brandsRepository = getRepository(Brand)
  }

  async add (data: AddBrandParams): Promise<void> {
    const brand = this.brandsRepository.create(data)
    await this.brandsRepository.save(brand)
  }
}
