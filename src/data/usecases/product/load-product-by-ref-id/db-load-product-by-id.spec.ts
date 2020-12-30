import { LoadProductByRefIdRepositorySpy, throwError } from '@/data/test'
import { DbLoadProductByRefId } from './db-load-product-by-ref-id'

type SutTypes = {
  sut: DbLoadProductByRefId
  loadProductByRefIdRepositorySpy: LoadProductByRefIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProductByRefIdRepositorySpy = new LoadProductByRefIdRepositorySpy()
  const sut = new DbLoadProductByRefId(loadProductByRefIdRepositorySpy)
  return {
    sut,
    loadProductByRefIdRepositorySpy
  }
}

let productId: string

describe('DbLoadProductByRefId', () => {
  test('Should call LoadProductByIdRepository', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    await sut.loadByRefId(productId)
    expect(loadProductByRefIdRepositorySpy.id).toBe(productId)
  })

  test('Should return Product on success', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    const product = await sut.loadByRefId(productId)
    expect(product).toEqual(loadProductByRefIdRepositorySpy.productModel)
  })

  test('Should throw if LoadProductByIdRepository throws', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    jest.spyOn(loadProductByRefIdRepositorySpy, 'loadByRefId').mockImplementationOnce(throwError)
    const promise = sut.loadByRefId(productId)
    await expect(promise).rejects.toThrow()
  })
})
