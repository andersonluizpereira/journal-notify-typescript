import { AddCategoryRepositorySpy, throwError } from '@/data/test'
import { mockAddCategoryParams } from '@/domain/test/mock-category/mock-category'
import { DbAddCategory } from './db-add-category'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const categoryData = mockAddCategoryParams()
    await sut.add(categoryData)
    expect(addCategoryRepositorySpy.addCategoryParams).toEqual(categoryData)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
