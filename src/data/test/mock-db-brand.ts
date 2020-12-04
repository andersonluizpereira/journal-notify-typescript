import { AddBrandRepository } from '../protocols/db'
import { AddBrandParams } from '@/domain/usecases/brand/add-brand'

export class AddBrandRepositorySpy implements AddBrandRepository {
  addBrandParams: AddBrandParams

  async add (data: AddBrandParams): Promise<void> {
    this.addBrandParams = data
    return Promise.resolve()
  }
}
