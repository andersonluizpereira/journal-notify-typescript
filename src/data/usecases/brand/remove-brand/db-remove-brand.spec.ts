import { RemoveBrandRepositorySpy } from '@/data/test/mock-db-brand'
import { throwError } from '@/data/test/test-helper'
import { DbRemoveBrand } from './db-remove-brand'

type SutTypes = {
  sut: DbRemoveBrand
  removeBrandRepositorySpy: RemoveBrandRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeBrandRepositorySpy = new RemoveBrandRepositorySpy()
  const sut = new DbRemoveBrand(removeBrandRepositorySpy)
  return {
    sut,
    removeBrandRepositorySpy
  }
}
let brandId: string
describe('DbRemoveBrand Usecase', () => {
  test('Should call RemoveBrandRepository with correct values', async () => {
    const { sut, removeBrandRepositorySpy } = makeSut()
    await sut.removeById(brandId)
    expect(removeBrandRepositorySpy.id).toEqual(brandId)
  })

  test('Should throw if RemoveBrandRepository throws', async () => {
    const { sut, removeBrandRepositorySpy } = makeSut()
    jest.spyOn(removeBrandRepositorySpy, 'removeById').mockImplementationOnce(throwError)
    const promise = sut.removeById(brandId)
    await expect(promise).rejects.toThrow()
  })
})
