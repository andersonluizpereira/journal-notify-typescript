import { AddBrand, AddBrandRepository, AddBrandParams } from './db-add-brand-protocols'

export class DbAddBrand implements AddBrand {
  constructor (private readonly addBrandRepository: AddBrandRepository) {}
  async add (data: AddBrandParams): Promise<void> {
    await this.addBrandRepository.add(data)
  }
}
