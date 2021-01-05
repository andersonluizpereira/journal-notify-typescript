import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { LoadProductByRefIdRepositorySpy, mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { DbLoadProductByRefId } from './db-load-product-by-ref-id'

type SutTypes = {
  sut: DbLoadProductByRefId
  loadProductByRefIdRepositorySpy: LoadProductByRefIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadProductByRefIdRepositorySpy = new LoadProductByRefIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadProductByRefId(loadProductByRefIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadProductByRefIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let refId: string

describe('DbLoadProductByRefId', () => {
  test('should call LoadCache with correct value', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

    await sut.loadByRefId(refId)

    expect(cacheSpy).toHaveBeenCalledWith(`productsRefId:${refId}`)
  })

  test('should throw if LoadCache throws', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    await expect(sut.loadByRefId(refId)).rejects.toThrow()
  })

  test('should return posts if LoadCache returns productsRefId', async () => {
    const { sut, loadCacheDbStub, loadProductByRefIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.resolve(loadProductByRefIdRepositorySpy.productModel))

    const response = await sut.loadByRefId(refId)

    expect(response).toEqual(loadProductByRefIdRepositorySpy.productModel)
  })
  test('Should call LoadProductByIdRepository', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    await sut.loadByRefId(refId)
    expect(loadProductByRefIdRepositorySpy.id).toBe(refId)
  })

  test('Should return Product on success', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    const product = await sut.loadByRefId(refId)
    expect(product).toEqual(loadProductByRefIdRepositorySpy.productModel)
  })

  test('Should throw if LoadProductByIdRepository throws', async () => {
    const { sut, loadProductByRefIdRepositorySpy } = makeSut()
    jest.spyOn(loadProductByRefIdRepositorySpy, 'loadByRefId').mockImplementationOnce(throwError)
    const promise = sut.loadByRefId(refId)
    await expect(promise).rejects.toThrow()
  })
})
