import { LoadSkusRepositorySpy, throwError } from '@/data/test'
import { DbLoadSkus } from './db-load-sku'

type SutTypes = {
  sut: DbLoadSkus
  loadSkusRepositorySpy: LoadSkusRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSkusRepositorySpy = new LoadSkusRepositorySpy()
  const sut = new DbLoadSkus(loadSkusRepositorySpy)
  return {
    sut,
    loadSkusRepositorySpy
  }
}

describe('DbLoadSkus', () => {
  test('Should call LoadSkusRepository', async () => {
    const { sut, loadSkusRepositorySpy } = makeSut()
    await sut.load()
    expect(loadSkusRepositorySpy.skuModels.length).toBe(2)
  })

  test('Should return a list of Skus on success', async () => {
    const { sut, loadSkusRepositorySpy } = makeSut()
    const sku = await sut.load()
    expect(sku).toEqual(loadSkusRepositorySpy.skuModels)
  })

  test('Should throw if LoadSkusRepository throws', async () => {
    const { sut, loadSkusRepositorySpy } = makeSut()
    jest.spyOn(loadSkusRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
