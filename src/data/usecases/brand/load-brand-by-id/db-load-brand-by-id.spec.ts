import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { LoadBrandByIdRepositorySpy } from '@/data/test/mock-db-brand'
import { DbLoadBrandById } from './db-load-brand-by-id'

type SutTypes = {
  sut: DbLoadBrandById
  loadBrandByIdRepositorySpy: LoadBrandByIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadBrandByIdRepositorySpy = new LoadBrandByIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadBrandById(loadBrandByIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadBrandByIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let brandId: string

describe('DbLoadBrandById', () => {
  test('should call LoadCache with correct value', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

    await sut.loadById(brandId)

    expect(cacheSpy).toHaveBeenCalledWith(`brands:${brandId}`)
  })

  test('should throw if LoadCache throws', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    await expect(sut.loadById(brandId)).rejects.toThrow()
  })

  test('should return posts if LoadCache returns posts', async () => {
    const { sut, loadCacheDbStub, loadBrandByIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.resolve(loadBrandByIdRepositorySpy.brandModel))

    const response = await sut.loadById(brandId)

    expect(response).toEqual(loadBrandByIdRepositorySpy.brandModel)
  })

  test('Should call LoadBrandByIdRepository', async () => {
    const { sut, loadBrandByIdRepositorySpy } = makeSut()
    await sut.loadById(brandId)
    expect(loadBrandByIdRepositorySpy.id).toBe(brandId)
  })

  test('Should return Brand on success', async () => {
    const { sut, loadBrandByIdRepositorySpy } = makeSut()
    const brand = await sut.loadById(brandId)
    expect(brand).toEqual(loadBrandByIdRepositorySpy.brandModel)
  })

  test('Should throw if LoadBrandByIdRepository throws', async () => {
    const { sut, loadBrandByIdRepositorySpy } = makeSut()
    jest.spyOn(loadBrandByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(brandId)
    await expect(promise).rejects.toThrow()
  })
})
