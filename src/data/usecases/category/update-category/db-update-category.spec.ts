import { AddCategoryRepositorySpy, LoadCategorysRepositorySpy, throwError, UpdateCategoryRepositorySpy } from '@/data/test'
import { DbUpdateCategory } from './db-update-category'
import { mockAddCategoryParams } from '@/domain/test/mock-category/mock-category'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  addCategoryRepositorySpy: AddCategoryRepositorySpy
  loadCategorysRepositorySpy: LoadCategorysRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const loadCategorysRepositorySpy = new LoadCategorysRepositorySpy()
  const sut = new DbUpdateCategory(updateCategoryRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy,
    addCategoryRepositorySpy,
    loadCategorysRepositorySpy
  }
}

describe('DbUpdateCategory Usecase', () => {
  test('Should call UpdateCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy, loadCategorysRepositorySpy, updateCategoryRepositorySpy } = makeSut()
    const categoryData = mockAddCategoryParams()
    await addCategoryRepositorySpy.add(categoryData)
    var categorysData = await loadCategorysRepositorySpy.loadAll()
    categorysData[0].name += 'updated'
    const categorysDataName = categorysData[0].name
    const category = await sut.update(categorysData[0])
    expect(category.name).toEqual(categorysDataName)
    expect(updateCategoryRepositorySpy.categoryModel).toEqual(category)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockImplementationOnce(throwError)
    const categoryData = mockAddCategoryParams()
    const promise = sut.update(categoryData)
    await expect(promise).rejects.toThrow()
  })
})
