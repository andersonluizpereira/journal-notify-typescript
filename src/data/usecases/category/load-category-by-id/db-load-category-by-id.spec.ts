import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { LoadCategoryByIdRepositorySpy, mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { DbLoadCategoryById } from './db-load-category-by-id'

type SutTypes = {
  sut: DbLoadCategoryById
  loadCategoryByIdRepositorySpy: LoadCategoryByIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositorySpy = new LoadCategoryByIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadCategoryByIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let categoryId: string

describe('DbLoadCategoryById', () => {
  test('should call LoadCache with correct value', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

    await sut.loadById(categoryId)

    expect(cacheSpy).toHaveBeenCalledWith(`categorys:${categoryId}`)
  })

  test('should throw if LoadCache throws', async () => {
    const { sut, loadCacheDbStub } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))

    await expect(sut.loadById(categoryId)).rejects.toThrow()
  })

  test('should return posts if LoadCache returns categorys', async () => {
    const { sut, loadCacheDbStub, loadCategoryByIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadCacheDbStub, 'load')
      .mockReturnValueOnce(Promise.resolve(loadCategoryByIdRepositorySpy.categoryModel))

    const response = await sut.loadById(categoryId)

    expect(response).toEqual(loadCategoryByIdRepositorySpy.categoryModel)
  })
  test('Should call LoadCategoryByIdRepository', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    await sut.loadById(categoryId)
    expect(loadCategoryByIdRepositorySpy.id).toBe(categoryId)
  })

  test('Should return Category on success', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    const category = await sut.loadById(categoryId)
    expect(category).toEqual(loadCategoryByIdRepositorySpy.categoryModel)
  })

  test('Should throw if LoadCategoryByIdRepository throws', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCategoryByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(categoryId)
    await expect(promise).rejects.toThrow()
  })
})
