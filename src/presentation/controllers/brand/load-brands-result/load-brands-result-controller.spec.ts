import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadBrandsByIdSpy, LoadBrandsSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadBrandResultController } from './load-brands-result-controller'
import { HttpRequest } from './load-brands-result-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    brandId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadBrandResultController
    loadBrandByIdSpy: LoadBrandsByIdSpy
    loadBrandResultSpy: LoadBrandsSpy
  }

const makeSut = (): SutTypes => {
  const loadBrandByIdSpy = new LoadBrandsByIdSpy()
  const loadBrandResultSpy = new LoadBrandsSpy()
  const sut = new LoadBrandResultController(loadBrandByIdSpy, loadBrandResultSpy)
  return {
    sut,
    loadBrandByIdSpy,
    loadBrandResultSpy
  }
}

describe('LoadBrandResult Controller', () => {
  test('Should call LoadBrandById with correct value', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadBrandByIdSpy.id).toBe(httpRequest.params.brandId)
  })

  test('Should return 403 if LoadBrandById returns null', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    loadBrandByIdSpy.brandModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('brandId')))
  })

  test('Should return 500 if LoadBrandById throws', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    jest.spyOn(loadBrandByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadBrandResult with correct values', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadBrandByIdSpy.id).toBe(httpRequest.params.brandId)
  })

  test('Should return 500 if LoadBrandResult throws', async () => {
    const { sut, loadBrandResultSpy } = makeSut()
    jest.spyOn(loadBrandResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadBrandResultSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadBrandResultSpy.brandModels))
  })
})
