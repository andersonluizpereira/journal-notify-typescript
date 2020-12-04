import { AddBrand, AddBrandParams } from '@/domain/usecases/brand/add-brand'

export class AddBrandSpy implements AddBrand {
  addBrandParams: AddBrandParams

  async add (data: AddBrandParams): Promise<void> {
    this.addBrandParams = data
    return Promise.resolve()
  }
}
