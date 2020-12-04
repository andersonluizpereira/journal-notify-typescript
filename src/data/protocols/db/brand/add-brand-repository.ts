import { AddBrandParams } from '@/domain/usecases'

export interface AddBrandRepository {
  add(data: AddBrandParams): Promise<void>
}
