import { throwError } from '@/data/test'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductsByIdSpy, LoadProductsSpy } from '@/presentation/test'
import faker from 'faker'
import { LoadProductResultController } from './load-products-result-controller'
import { HttpRequest } from './load-products-result-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    productId: faker.random.uuid()
  }
})

  type SutTypes = {
    sut: LoadProductResultController
    loadProductByIdSpy: LoadProductsByIdSpy
    loadProductResultSpy: LoadProductsSpy
  }

const makeSut = (): SutTypes => {
  const loadProductByIdSpy = new LoadProductsByIdSpy()
  const loadProductResultSpy = new LoadProductsSpy()
  const sut = new LoadProductResultController(loadProductByIdSpy, loadProductResultSpy)
  return {
    sut,
    loadProductByIdSpy,
    loadProductResultSpy
  }
}

describe('LoadProductResult Controller', () => {
  test('Should call LoadProductById with correct value', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductByIdSpy.id).toBe(httpRequest.params.productId)
  })

  test('Should return 403 if LoadProductById returns null', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    loadProductByIdSpy.productModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('productId')))
  })

  test('Should return 500 if LoadProductById throws', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    jest.spyOn(loadProductByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadProductResult with correct values', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductByIdSpy.id).toBe(httpRequest.params.productId)
  })

  test('Should return 500 if LoadProductResult throws', async () => {
    const { sut, loadProductResultSpy } = makeSut()
    const mockRequestError = (): HttpRequest => ({})
    jest.spyOn(loadProductResultSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequestError())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProductByIdSpy.productModel))
  })
})
