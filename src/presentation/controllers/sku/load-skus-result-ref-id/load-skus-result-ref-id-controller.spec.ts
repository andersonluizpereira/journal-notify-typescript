import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSkusByRefIdSpy, LoadSkusSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadSkuResultRefByIdController } from './load-skus-result-ref-id-controller'
import { HttpRequest } from './load-skus-result-ref-id-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    refId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadSkuResultRefByIdController
    loadSkuByRefIdSpy: LoadSkusByRefIdSpy
    loadSkuResultSpy: LoadSkusSpy
  }

const makeSut = (): SutTypes => {
  const loadSkuByRefIdSpy = new LoadSkusByRefIdSpy()
  const loadSkuResultSpy = new LoadSkusSpy()
  const sut = new LoadSkuResultRefByIdController(loadSkuByRefIdSpy, loadSkuResultSpy)
  return {
    sut,
    loadSkuByRefIdSpy,
    loadSkuResultSpy
  }
}

describe('LoadSkuResult Controller', () => {
  test('Should call LoadSkuById with correct value', async () => {
    const { sut, loadSkuByRefIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSkuByRefIdSpy.refId).toBe(httpRequest.params.refId)
  })

  test('Should return 403 if LoadSkuById returns null', async () => {
    const { sut, loadSkuByRefIdSpy } = makeSut()
    loadSkuByRefIdSpy.skuModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('refId')))
  })

  test('Should return 500 if LoadSkuById throws', async () => {
    const { sut, loadSkuByRefIdSpy } = makeSut()
    jest.spyOn(loadSkuByRefIdSpy, 'loadByRefId').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSkuResult with correct values', async () => {
    const { sut, loadSkuByRefIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSkuByRefIdSpy.refId).toBe(httpRequest.params.refId)
  })

  test('Should return 500 if LoadSkuResult throws', async () => {
    const { sut, loadSkuResultSpy } = makeSut()
    const mockRequestError = (): HttpRequest => ({})
    jest.spyOn(loadSkuResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestError())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSkuByRefIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSkuByRefIdSpy.skuModel))
  })
})
