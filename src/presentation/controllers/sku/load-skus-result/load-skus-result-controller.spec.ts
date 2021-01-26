import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSkusByIdSpy, LoadSkusSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadSkuResultController } from './load-skus-result-controller'
import { HttpRequest } from './load-skus-result-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    skuId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadSkuResultController
    loadSkuByIdSpy: LoadSkusByIdSpy
    loadSkuResultSpy: LoadSkusSpy
  }

const makeSut = (): SutTypes => {
  const loadSkuByIdSpy = new LoadSkusByIdSpy()
  const loadSkuResultSpy = new LoadSkusSpy()
  const sut = new LoadSkuResultController(loadSkuByIdSpy, loadSkuResultSpy)
  return {
    sut,
    loadSkuByIdSpy,
    loadSkuResultSpy
  }
}

describe('LoadSkuResult Controller', () => {
  test('Should call LoadSkuById with correct value', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSkuByIdSpy.id).toBe(httpRequest.params.skuId)
  })

  test('Should return 403 if LoadSkuById returns null', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    loadSkuByIdSpy.skuModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('skuId')))
  })

  test('Should return 500 if LoadSkuById throws', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    jest.spyOn(loadSkuByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSkuResult with correct values', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSkuByIdSpy.id).toBe(httpRequest.params.skuId)
  })

  test('Should return 500 if LoadSkuResult throws', async () => {
    const { sut, loadSkuResultSpy } = makeSut()
    const mockRequestError = (): HttpRequest => ({})
    jest.spyOn(loadSkuResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestError())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSkuByIdSpy.skuModel))
  })
})
