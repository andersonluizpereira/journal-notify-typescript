import { throwError } from '@/data/test/test-helper'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadBrandsSpy } from '@/presentation/test/mock-brand'
import { LoadBrandsController } from './load-brands-controller'
import { HttpRequest } from './load-brands-controller-protocols'

const mockRequest = (): HttpRequest => ({ })

type SutTypes = {
  sut: LoadBrandsController
  loadBrandsSpy: LoadBrandsSpy
}

const makeSut = (): SutTypes => {
  const loadBrandsSpy = new LoadBrandsSpy()
  const sut = new LoadBrandsController(loadBrandsSpy)
  return {
    sut,
    loadBrandsSpy
  }
}

describe('LoadBrands Controller', () => {
  test('Should call LoadBrands with correct value', async () => {
    const { sut, loadBrandsSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadBrandsSpy.brandModels.length).toBe(1)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadBrandsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadBrandsSpy.brandModels))
  })

  test('Should return 204 if LoadBrands returns empty', async () => {
    const { sut, loadBrandsSpy } = makeSut()
    loadBrandsSpy.brandModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadBrands throws', async () => {
    const { sut, loadBrandsSpy } = makeSut()
    jest.spyOn(loadBrandsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
