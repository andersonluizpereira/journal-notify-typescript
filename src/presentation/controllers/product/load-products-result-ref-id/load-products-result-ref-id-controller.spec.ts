import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductsByRefIdSpy, LoadProductsSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadProductResultRefByIdController } from './load-products-result-ref-id-controller'
import { HttpRequest } from './load-products-result-ref-id-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    refId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadProductResultRefByIdController
    loadProductByRefIdSpy: LoadProductsByRefIdSpy
    loadProductResultSpy: LoadProductsSpy
  }

const makeSut = (): SutTypes => {
  const loadProductByRefIdSpy = new LoadProductsByRefIdSpy()
  const loadProductResultSpy = new LoadProductsSpy()
  const sut = new LoadProductResultRefByIdController(loadProductByRefIdSpy, loadProductResultSpy)
  return {
    sut,
    loadProductByRefIdSpy,
    loadProductResultSpy
  }
}

describe('LoadProductResult Controller', () => {
  test('Should call LoadProductById with correct value', async () => {
    const { sut, loadProductByRefIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductByRefIdSpy.refId).toBe(httpRequest.params.refId)
  })

  test('Should return 403 if LoadProductById returns null', async () => {
    const { sut, loadProductByRefIdSpy } = makeSut()
    loadProductByRefIdSpy.productModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('refId')))
  })

  test('Should return 500 if LoadProductById throws', async () => {
    const { sut, loadProductByRefIdSpy } = makeSut()
    jest.spyOn(loadProductByRefIdSpy, 'loadByRefId').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadProductResult with correct values', async () => {
    const { sut, loadProductByRefIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductByRefIdSpy.refId).toBe(httpRequest.params.refId)
  })

  test('Should return 500 if LoadProductResult throws', async () => {
    const { sut, loadProductResultSpy } = makeSut()
    const mockRequestError = (): HttpRequest => ({})
    jest.spyOn(loadProductResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestError())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProductByRefIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProductByRefIdSpy.productModel))
  })
})
