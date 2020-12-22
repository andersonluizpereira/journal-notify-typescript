import { throwError } from '@/data/test/test-helper'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadCategorysSpy } from '@/presentation/test/mock-category'
import { LoadCategorysController } from './load-categorys-controller'
import { HttpRequest } from './load-categorys-controller-protocols'

const mockRequest = (): HttpRequest => ({ })

type SutTypes = {
  sut: LoadCategorysController
  loadCategorysSpy: LoadCategorysSpy
}

const makeSut = (): SutTypes => {
  const loadCategorysSpy = new LoadCategorysSpy()
  const sut = new LoadCategorysController(loadCategorysSpy)
  return {
    sut,
    loadCategorysSpy
  }
}

describe('LoadCategorys Controller', () => {
  test('Should call LoadCategorys with correct value', async () => {
    const { sut, loadCategorysSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadCategorysSpy.categoryModels.length).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCategorysSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCategorysSpy.categoryModels))
  })

  test('Should return 204 if LoadCategorys returns empty', async () => {
    const { sut, loadCategorysSpy } = makeSut()
    loadCategorysSpy.categoryModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCategorys throws', async () => {
    const { sut, loadCategorysSpy } = makeSut()
    jest.spyOn(loadCategorysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
