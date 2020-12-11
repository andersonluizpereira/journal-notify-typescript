import { throwError } from '@/data/test'
import { LoadBrandByIdRepositorySpy } from '@/data/test/mock-db-brand'
import { DbLoadBrandById } from './db-load-brand-by-id'

type SutTypes = {
  sut: DbLoadBrandById
  loadBrandByIdRepositorySpy: LoadBrandByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadBrandByIdRepositorySpy = new LoadBrandByIdRepositorySpy()
  const sut = new DbLoadBrandById(loadBrandByIdRepositorySpy)
  return {
    sut,
    loadBrandByIdRepositorySpy
  }
}

let brandId: string

describe('DbLoadBrandById', () => {
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
