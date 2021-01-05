import { ILoadCache, ISaveCache } from '@/data/protocols/cache'
import { LoadProductByIdRepositorySpy, mockDbLoadCache, mockDbSaveCache, throwError } from '@/data/test'
import { DbLoadProductById } from './db-load-product-by-id'

type SutTypes = {
  sut: DbLoadProductById
  loadProductByIdRepositorySpy: LoadProductByIdRepositorySpy
  loadCacheDbStub: ILoadCache
  saveCacheDbStub: ISaveCache
}

const makeSut = (): SutTypes => {
  const loadProductByIdRepositorySpy = new LoadProductByIdRepositorySpy()
  const loadCacheDbStub = mockDbLoadCache()
  const saveCacheDbStub = mockDbSaveCache()
  const sut = new DbLoadProductById(loadProductByIdRepositorySpy, loadCacheDbStub, saveCacheDbStub)
  return {
    sut,
    loadProductByIdRepositorySpy,
    loadCacheDbStub,
    saveCacheDbStub
  }
}

let productId: string

describe('DbLoadProductById', () => {
  describe('DbLoadproductById', () => {
    test('should call LoadCache with correct value', async () => {
      const { sut, loadCacheDbStub } = makeSut()

      const cacheSpy = jest.spyOn(loadCacheDbStub, 'load')

      await sut.loadById(productId)

      expect(cacheSpy).toHaveBeenCalledWith(`products:${productId}`)
    })

    test('should throw if LoadCache throws', async () => {
      const { sut, loadCacheDbStub } = makeSut()

      jest
        .spyOn(loadCacheDbStub, 'load')
        .mockReturnValueOnce(Promise.reject(new Error()))

      await expect(sut.loadById(productId)).rejects.toThrow()
    })

    test('should return posts if LoadCache returns products', async () => {
      const { sut, loadCacheDbStub, loadProductByIdRepositorySpy } = makeSut()

      jest
        .spyOn(loadCacheDbStub, 'load')
        .mockReturnValueOnce(Promise.resolve(loadProductByIdRepositorySpy.productModel))

      const response = await sut.loadById(productId)

      expect(response).toEqual(loadProductByIdRepositorySpy.productModel)
    })
    test('Should call LoadProductByIdRepository', async () => {
      const { sut, loadProductByIdRepositorySpy } = makeSut()
      await sut.loadById(productId)
      expect(loadProductByIdRepositorySpy.id).toBe(productId)
    })

    test('Should return Product on success', async () => {
      const { sut, loadProductByIdRepositorySpy } = makeSut()
      const product = await sut.loadById(productId)
      expect(product).toEqual(loadProductByIdRepositorySpy.productModel)
    })

    test('Should throw if LoadProductByIdRepository throws', async () => {
      const { sut, loadProductByIdRepositorySpy } = makeSut()
      jest.spyOn(loadProductByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
      const promise = sut.loadById(productId)
      await expect(promise).rejects.toThrow()
    })
  })
})
