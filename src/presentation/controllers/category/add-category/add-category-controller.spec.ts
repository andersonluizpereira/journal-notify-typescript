import { throwError } from '@/data/test'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { AddCategorySpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { AddCategoryController } from './add-category-controller'
import { HttpRequest } from './add-category-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
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
    sut: AddCategoryController
    validationSpy: ValidationSpy
    addCategorySpy: AddCategorySpy
  }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(validationSpy, addCategorySpy)
  return {
    sut,
    validationSpy,
    addCategorySpy
  }
}

describe('AddCategory Controller', () => {
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

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addCategorySpy.addCategoryParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
