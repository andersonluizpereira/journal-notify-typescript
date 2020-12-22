import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategorysByIdSpy, LoadCategorysSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadCategoryResultController } from './load-categorys-result-controller'
import { HttpRequest } from './load-categorys-result-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    categoryId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadCategoryResultController
    loadCategoryByIdSpy: LoadCategorysByIdSpy
    loadCategoryResultSpy: LoadCategorysSpy
  }

const makeSut = (): SutTypes => {
  const loadCategoryByIdSpy = new LoadCategorysByIdSpy()
  const loadCategoryResultSpy = new LoadCategorysSpy()
  const sut = new LoadCategoryResultController(loadCategoryByIdSpy, loadCategoryResultSpy)
  return {
    sut,
    loadCategoryByIdSpy,
    loadCategoryResultSpy
  }
}

describe('LoadCategoryResult Controller', () => {
  test('Should call LoadCategoryById with correct value', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadCategoryByIdSpy.id).toBe(httpRequest.params.categoryId)
  })

  test('Should return 403 if LoadCategoryById returns null', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    loadCategoryByIdSpy.categoryModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should return 500 if LoadCategoryById throws', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    jest.spyOn(loadCategoryByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadCategoryResult with correct values', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadCategoryByIdSpy.id).toBe(httpRequest.params.categoryId)
  })

  test('Should return 500 if LoadCategoryResult throws', async () => {
    const { sut, loadCategoryResultSpy } = makeSut()
    const mockRequestError = (): HttpRequest => ({})
    jest.spyOn(loadCategoryResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestError())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCategoryByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCategoryByIdSpy.categoryModel))
  })
})
