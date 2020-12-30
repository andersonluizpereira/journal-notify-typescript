import { RemoveProductRepositorySpy } from '@/data/test/mock-db-product'
import { throwError } from '@/data/test/test-helper'
import { DbRemoveProduct } from './db-remove-product'

type SutTypes = {
  sut: DbRemoveProduct
  removeProductRepositorySpy: RemoveProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeProductRepositorySpy = new RemoveProductRepositorySpy()
  const sut = new DbRemoveProduct(removeProductRepositorySpy)
  return {
    sut,
    removeProductRepositorySpy
  }
}
let productId: string
describe('DbRemoveProduct Usecase', () => {
  test('Should call RemoveProductRepository with correct values', async () => {
    const { sut, removeProductRepositorySpy } = makeSut()
    await sut.removeById(productId)
    expect(removeProductRepositorySpy.id).toEqual(productId)
  })

  test('Should throw if RemoveProductRepository throws', async () => {
    const { sut, removeProductRepositorySpy } = makeSut()
    jest.spyOn(removeProductRepositorySpy, 'removeById').mockImplementationOnce(throwError)
    const promise = sut.removeById(productId)
    await expect(promise).rejects.toThrow()
  })
})
