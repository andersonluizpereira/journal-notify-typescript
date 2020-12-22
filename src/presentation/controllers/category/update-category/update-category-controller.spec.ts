
import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategorysByIdSpy, UpdateCategorySpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { UpdateCategoryController } from './update-category-controller'
import { HttpRequest } from './update-category-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    keywords: faker.random.word(),
    title: faker.random.word(),
    description: faker.random.word(),
    fatherCategoryId: faker.random.number(),
    globalCategoryId: faker.random.number(),
    showInStoreFront: faker.random.boolean(),
    isActive: faker.random.boolean(),
    activeStoreFrontLink: faker.random.boolean(),
    showBrandFilter: faker.random.boolean(),
    score: faker.random.number(),
    stockKeepingUnitSelectionMode: faker.random.word()
  }
})

    type SutTypes = {
      sut: UpdateCategoryController
      validationSpy: ValidationSpy
      loadCategoryByIdSpy: LoadCategorysByIdSpy
      updateCategorySpy: UpdateCategorySpy
    }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadCategoryByIdSpy = new LoadCategorysByIdSpy()
  const updateCategorySpy = new UpdateCategorySpy()
  const sut = new UpdateCategoryController(updateCategorySpy, loadCategoryByIdSpy, validationSpy)
  return {
    sut,
    validationSpy,
    loadCategoryByIdSpy,
    updateCategorySpy
  }
}

describe('UpdateCategory Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 403 if UpdateCategory returns null', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    loadCategoryByIdSpy.categoryModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This category is not found!')))
  })

  test('Should call UpdateCategory with correct values', async () => {
    const { sut, updateCategorySpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(updateCategorySpy.categoryModel).toEqual(httpRequest.body)
  })

  test('Should return 500 if UpdateCategory throws', async () => {
    const { sut, updateCategorySpy } = makeSut()
    jest.spyOn(updateCategorySpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
