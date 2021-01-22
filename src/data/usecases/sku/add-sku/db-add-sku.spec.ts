import { AddSkuRepositorySpy, throwError } from '@/data/test'
import { mockAddSkuParams } from '@/domain/test/mock-sku/mock-sku'
import { DbAddSku } from './db-add-sku'

type SutTypes = {
  sut: DbAddSku
  addSkuRepositorySpy: AddSkuRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSkuRepositorySpy = new AddSkuRepositorySpy()
  const sut = new DbAddSku(addSkuRepositorySpy)
  return {
    sut,
    addSkuRepositorySpy
  }
}

describe('DbAddSku Usecase', () => {
  test('Should call AddSkuRepository with correct values', async () => {
    const { sut, addSkuRepositorySpy } = makeSut()
    const skuData = mockAddSkuParams()
    const sku = await sut.add(skuData)
    expect(sku).toEqual(addSkuRepositorySpy.skuModel)
  })

  test('Should throw if AddSkuRepository throws', async () => {
    const { sut, addSkuRepositorySpy } = makeSut()
    jest.spyOn(addSkuRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSkuParams())
    await expect(promise).rejects.toThrow()
  })
})
