import { RemoveCategoryRepositorySpy } from '@/data/test/mock-db-category'
import { throwError } from '@/data/test/test-helper'
import { DbRemoveCategory } from './db-remove-category'

type SutTypes = {
  sut: DbRemoveCategory
  removeCategoryRepositorySpy: RemoveCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeCategoryRepositorySpy = new RemoveCategoryRepositorySpy()
  const sut = new DbRemoveCategory(removeCategoryRepositorySpy)
  return {
    sut,
    removeCategoryRepositorySpy
  }
}
let categoryId: string
describe('DbRemoveCategory Usecase', () => {
  test('Should call RemoveCategoryRepository with correct values', async () => {
    const { sut, removeCategoryRepositorySpy } = makeSut()
    await sut.removeById(categoryId)
    expect(removeCategoryRepositorySpy.id).toEqual(categoryId)
  })

  test('Should throw if RemoveCategoryRepository throws', async () => {
    const { sut, removeCategoryRepositorySpy } = makeSut()
    jest.spyOn(removeCategoryRepositorySpy, 'removeById').mockImplementationOnce(throwError)
    const promise = sut.removeById(categoryId)
    await expect(promise).rejects.toThrow()
  })
})
