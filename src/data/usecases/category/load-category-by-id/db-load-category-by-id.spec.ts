import { LoadCategoryByIdRepositorySpy, throwError } from '@/data/test'
import { DbLoadCategoryById } from './db-load-category-by-id'

type SutTypes = {
  sut: DbLoadCategoryById
  loadCategoryByIdRepositorySpy: LoadCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositorySpy = new LoadCategoryByIdRepositorySpy()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositorySpy)
  return {
    sut,
    loadCategoryByIdRepositorySpy
  }
}

let categoryId: string

describe('DbLoadCategoryById', () => {
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
