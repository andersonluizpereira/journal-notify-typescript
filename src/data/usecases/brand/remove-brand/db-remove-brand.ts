import { RemoveBrand, RemoveBrandRepository } from './db-remove-brand-protocols'

export class DbRemoveBrand implements RemoveBrand {
  constructor (private readonly removeBrandRepository: RemoveBrandRepository) {}
  async removeById (id: string): Promise<void> {
    await this.removeBrandRepository.removeById(id)
  }
}
