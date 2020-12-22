import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategorysByIdSpy, RemoveCategorySpy } from '@/presentation/test'
import faker from 'faker'
import { RemoveCategoryController } from './remove-category-controller'
import { HttpRequest } from './remove-category-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    categoryId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: RemoveCategoryController
  removeCategorySpy: RemoveCategorySpy
  loadCategoryByIdSpy: LoadCategorysByIdSpy
}

const makeSut = (): SutTypes => {
  const removeCategorySpy = new RemoveCategorySpy()
  const loadCategoryByIdSpy = new LoadCategorysByIdSpy()
  const sut = new RemoveCategoryController(removeCategorySpy, loadCategoryByIdSpy)
  return {
    sut,
    removeCategorySpy,
    loadCategoryByIdSpy
  }
}

describe('RemoveCategory Controller', () => {
  test('Should return 403 if RemoveCategory returns null', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    loadCategoryByIdSpy.categoryModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This value is not found!')))
  })

  test('Should call RemoveCategory with correct values', async () => {
    const { sut, removeCategorySpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeCategorySpy.id).toEqual(httpRequest.params.categoryId)
  })

  test('Should return 500 if RemoveCategory throws', async () => {
    const { sut, removeCategorySpy } = makeSut()
    jest.spyOn(removeCategorySpy, 'removeById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
