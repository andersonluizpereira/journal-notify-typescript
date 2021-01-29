import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { LoadSkuByRefIdRepositorySpy, mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { DbLoadSkuByRefId } from './db-load-sku-by-ref-id'

type SutTypes = {
  sut: DbLoadSkuByRefId
  loadSkuByRefIdRepositorySpy: LoadSkuByRefIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadSkuByRefIdRepositorySpy = new LoadSkuByRefIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadSkuByRefId(loadSkuByRefIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadSkuByRefIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let refId: string

describe('DbLoadSkuByRefId', () => {
  test('should call LoadCache with correct value', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

    await sut.loadByRefId(refId)

    expect(cacheSpy).toHaveBeenCalledWith(`skusRefId:${refId}`)
  })

  test('should throw if LoadCache throws', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    await expect(sut.loadByRefId(refId)).rejects.toThrow()
  })

  test('should return posts if LoadCache returns skusRefId', async () => {
    const { sut, loadCacheDbStub, loadSkuByRefIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.resolve(loadSkuByRefIdRepositorySpy.skuModel))

    const response = await sut.loadByRefId(refId)

    expect(response).toEqual(loadSkuByRefIdRepositorySpy.skuModel)
  })
  test('Should call LoadSkuByIdRepository', async () => {
    const { sut, loadSkuByRefIdRepositorySpy } = makeSut()
    await sut.loadByRefId(refId)
    expect(loadSkuByRefIdRepositorySpy.id).toBe(refId)
  })

  test('Should return Sku on success', async () => {
    const { sut, loadSkuByRefIdRepositorySpy } = makeSut()
    const sku = await sut.loadByRefId(refId)
    expect(sku).toEqual(loadSkuByRefIdRepositorySpy.skuModel)
  })

  test('Should throw if LoadSkuByIdRepository throws', async () => {
    const { sut, loadSkuByRefIdRepositorySpy } = makeSut()
    jest.spyOn(loadSkuByRefIdRepositorySpy, 'loadByRefId').mockImplementationOnce(throwError)
    const promise = sut.loadByRefId(refId)
    await expect(promise).rejects.toThrow()
  })
})
