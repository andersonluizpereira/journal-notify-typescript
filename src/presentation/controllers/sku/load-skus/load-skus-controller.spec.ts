import { throwError } from '@/data/test/test-helper'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSkusSpy } from '@/presentation/test/mock-sku'
import { LoadSkusController } from './load-skus-controller'
import { HttpRequest } from './load-skus-controller-protocols'

const mockRequest = (): HttpRequest => ({ })

type SutTypes = {
  sut: LoadSkusController
  loadSkusSpy: LoadSkusSpy
}

const makeSut = (): SutTypes => {
  const loadSkusSpy = new LoadSkusSpy()
  const sut = new LoadSkusController(loadSkusSpy)
  return {
    sut,
    loadSkusSpy
  }
}

describe('LoadSkus Controller', () => {
  test('Should call LoadSkus with correct value', async () => {
    const { sut, loadSkusSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSkusSpy.skuModels.length).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSkusSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSkusSpy.skuModels))
  })

  test('Should return 204 if LoadSkus returns empty', async () => {
    const { sut, loadSkusSpy } = makeSut()
    loadSkusSpy.skuModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSkus throws', async () => {
    const { sut, loadSkusSpy } = makeSut()
    jest.spyOn(loadSkusSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
