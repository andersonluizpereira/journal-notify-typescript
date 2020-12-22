import { LoadBrandsRepositorySpy, throwError } from '@/data/test'
import { DbLoadBrands } from './db-load-brand'

type SutTypes = {
  sut: DbLoadBrands
  loadBrandsRepositorySpy: LoadBrandsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadBrandsRepositorySpy = new LoadBrandsRepositorySpy()
  const sut = new DbLoadBrands(loadBrandsRepositorySpy)
  return {
    sut,
    loadBrandsRepositorySpy
  }
}

describe('DbLoadBrands', () => {
  test('Should call LoadBrandsRepository', async () => {
    const { sut, loadBrandsRepositorySpy } = makeSut()
    await sut.load()
    expect(loadBrandsRepositorySpy.brandModels.length).toBe(2)
  })

  test('Should return a list of Brands on success', async () => {
    const { sut, loadBrandsRepositorySpy } = makeSut()
    const brands = await sut.load()
    expect(brands).toEqual(loadBrandsRepositorySpy.brandModels)
  })

  test('Should throw if LoadBrandsRepository throws', async () => {
    const { sut, loadBrandsRepositorySpy } = makeSut()
    jest.spyOn(loadBrandsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
