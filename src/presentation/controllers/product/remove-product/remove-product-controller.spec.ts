import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductsByIdSpy, RemoveProductSpy } from '@/presentation/test'
import faker from 'faker'
import { RemoveProductController } from './remove-product-controller'
import { HttpRequest } from './remove-product-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    productId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: RemoveProductController
  removeProductSpy: RemoveProductSpy
  loadProductByIdSpy: LoadProductsByIdSpy
}

const makeSut = (): SutTypes => {
  const removeProductSpy = new RemoveProductSpy()
  const loadProductByIdSpy = new LoadProductsByIdSpy()
  const sut = new RemoveProductController(removeProductSpy, loadProductByIdSpy)
  return {
    sut,
    removeProductSpy,
    loadProductByIdSpy
  }
}

describe('RemoveProduct Controller', () => {
  test('Should return 403 if RemoveProduct returns null', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    loadProductByIdSpy.productModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This value is not found!')))
  })

  test('Should call RemoveProduct with correct values', async () => {
    const { sut, removeProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeProductSpy.id).toEqual(httpRequest.params.productId)
  })

  test('Should return 500 if RemoveProduct throws', async () => {
    const { sut, removeProductSpy } = makeSut()
    jest.spyOn(removeProductSpy, 'removeById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
