import { LoadProductsRepositorySpy, throwError } from '@/data/test'
import { DbLoadProducts } from './db-load-product'

type SutTypes = {
  sut: DbLoadProducts
  loadProductsRepositorySpy: LoadProductsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProductsRepositorySpy = new LoadProductsRepositorySpy()
  const sut = new DbLoadProducts(loadProductsRepositorySpy)
  return {
    sut,
    loadProductsRepositorySpy
  }
}

describe('DbLoadProducts', () => {
  test('Should call LoadProductsRepository', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    await sut.load()
    expect(loadProductsRepositorySpy.productModels.length).toBe(2)
  })

  test('Should return a list of Products on success', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    const products = await sut.load()
    expect(products).toEqual(loadProductsRepositorySpy.productModels)
  })

  test('Should throw if LoadProductsRepository throws', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    jest.spyOn(loadProductsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
