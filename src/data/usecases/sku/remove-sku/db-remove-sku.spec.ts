import { RemoveSkuRepositorySpy } from '@/data/test/mock-db-sku'
import { throwError } from '@/data/test/test-helper'
import { DbRemoveSku } from './db-remove-sku'

type SutTypes = {
  sut: DbRemoveSku
  removeSkuRepositorySpy: RemoveSkuRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeSkuRepositorySpy = new RemoveSkuRepositorySpy()
  const sut = new DbRemoveSku(removeSkuRepositorySpy)
  return {
    sut,
    removeSkuRepositorySpy
  }
}
let skuId: string
describe('DbRemoveSku Usecase', () => {
  test('Should call RemoveSkuRepository with correct values', async () => {
    const { sut, removeSkuRepositorySpy } = makeSut()
    await sut.removeById(skuId)
    expect(removeSkuRepositorySpy.id).toEqual(skuId)
  })

  test('Should throw if RemoveSkuRepository throws', async () => {
    const { sut, removeSkuRepositorySpy } = makeSut()
    jest.spyOn(removeSkuRepositorySpy, 'removeById').mockImplementationOnce(throwError)
    const promise = sut.removeById(skuId)
    await expect(promise).rejects.toThrow()
  })
})
