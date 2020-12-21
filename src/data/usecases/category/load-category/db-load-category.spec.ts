import { LoadCategorysRepositorySpy, throwError } from '@/data/test'
import { DbLoadCategorys } from './db-load-category'

type SutTypes = {
  sut: DbLoadCategorys
  loadCategorysRepositorySpy: LoadCategorysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategorysRepositorySpy = new LoadCategorysRepositorySpy()
  const sut = new DbLoadCategorys(loadCategorysRepositorySpy)
  return {
    sut,
    loadCategorysRepositorySpy
  }
}

describe('DbLoadCategorys', () => {
  test('Should call LoadCategorysRepository', async () => {
    const { sut, loadCategorysRepositorySpy } = makeSut()
    await sut.load()
    expect(loadCategorysRepositorySpy.categoryModels.length).toBe(2)
  })

  test('Should return a list of Categorys on success', async () => {
    const { sut, loadCategorysRepositorySpy } = makeSut()
    const categorys = await sut.load()
    expect(categorys).toEqual(loadCategorysRepositorySpy.categoryModels)
  })

  test('Should throw if LoadCategorysRepository throws', async () => {
    const { sut, loadCategorysRepositorySpy } = makeSut()
    jest.spyOn(loadCategorysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
