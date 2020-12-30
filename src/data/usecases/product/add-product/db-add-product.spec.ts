import { AddProductRepositorySpy, throwError } from '@/data/test'
import { mockAddProductParams } from '@/domain/test/mock-product/mock-product'
import { DbAddProduct } from './db-add-product'

type SutTypes = {
  sut: DbAddProduct
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(addProductRepositorySpy)
  return {
    sut,
    addProductRepositorySpy
  }
}

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const productData = mockAddProductParams()
    const product = await sut.add(productData)
    expect(product).toEqual(addProductRepositorySpy.productModel)
  })

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })
})
