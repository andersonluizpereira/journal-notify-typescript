import { AddBrandRepositorySpy, throwError } from '@/data/test'
import { mockAddBrandParams } from '@/domain/test/mock-brand/mock-brand'
import { DbAddBrand } from './db-add-brand'

type SutTypes = {
  sut: DbAddBrand
  addBrandRepositorySpy: AddBrandRepositorySpy
}

const makeSut = (): SutTypes => {
  const addBrandRepositorySpy = new AddBrandRepositorySpy()
  const sut = new DbAddBrand(addBrandRepositorySpy)
  return {
    sut,
    addBrandRepositorySpy
  }
}

describe('DbAddBrand Usecase', () => {
  test('Should call AddBrandRepository with correct values', async () => {
    const { sut, addBrandRepositorySpy } = makeSut()
    const brandData = mockAddBrandParams()
    await sut.add(brandData)
    expect(addBrandRepositorySpy.addBrandParams).toEqual(brandData)
  })

  test('Should throw if AddBrandRepository throws', async () => {
    const { sut, addBrandRepositorySpy } = makeSut()
    jest.spyOn(addBrandRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddBrandParams())
    await expect(promise).rejects.toThrow()
  })
})
