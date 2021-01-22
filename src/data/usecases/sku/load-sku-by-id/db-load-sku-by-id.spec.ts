import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { LoadSkuByIdRepositorySpy, mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { DbLoadSkuById } from './db-load-sku-by-id'

type SutTypes = {
  sut: DbLoadSkuById
  loadSkuByIdRepositorySpy: LoadSkuByIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadSkuByIdRepositorySpy = new LoadSkuByIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadSkuById(loadSkuByIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadSkuByIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let skuId: string

describe('DbLoadSkuById', () => {
  describe('DbLoadSkuById', () => {
    test('should call LoadCache with correct value', async () => {
      const { sut, loadCacheDbStub } = makeSut()

      const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

      await sut.loadById(skuId)

      expect(cacheSpy).toHaveBeenCalledWith(`skus:${skuId}`)
    })

    test('should throw if LoadCache throws', async () => {
      const { sut, loadCacheDbStub } = makeSut()

      jest
        .spyOn(loadCacheDbStub, 'load')
        .mockReturnValueOnce(Promise.reject(new Error()))

      await expect(sut.loadById(skuId)).rejects.toThrow()
    })

    test('should return posts if LoadCache returns skus', async () => {
      const { sut, loadCacheDbStub, loadSkuByIdRepositorySpy } = makeSut()

      jest
        .spyOn(loadCacheDbStub, 'load')
        .mockReturnValueOnce(Promise.resolve(loadSkuByIdRepositorySpy.skuModel))

      const response = await sut.loadById(skuId)

      expect(response).toEqual(loadSkuByIdRepositorySpy.skuModel)
    })
    test('Should call LoadSkuByIdRepository', async () => {
      const { sut, loadSkuByIdRepositorySpy } = makeSut()
      await sut.loadById(skuId)
      expect(loadSkuByIdRepositorySpy.id).toBe(skuId)
    })

    test('Should return Sku on success', async () => {
      const { sut, loadSkuByIdRepositorySpy } = makeSut()
      const sku = await sut.loadById(skuId)
      expect(sku).toEqual(loadSkuByIdRepositorySpy.skuModel)
    })

    test('Should throw if LoadSkuByIdRepository throws', async () => {
      const { sut, loadSkuByIdRepositorySpy } = makeSut()
      jest.spyOn(loadSkuByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
      const promise = sut.loadById(skuId)
      await expect(promise).rejects.toThrow()
    })
  })
})
