import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSkusByIdSpy, RemoveSkuSpy } from '@/presentation/test'
import faker from 'faker'
import { RemoveSkuController } from './remove-sku-controller'
import { HttpRequest } from './remove-sku-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    skuId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: RemoveSkuController
  removeSkuSpy: RemoveSkuSpy
  loadSkuByIdSpy: LoadSkusByIdSpy
}

const makeSut = (): SutTypes => {
  const removeSkuSpy = new RemoveSkuSpy()
  const loadSkuByIdSpy = new LoadSkusByIdSpy()
  const sut = new RemoveSkuController(removeSkuSpy, loadSkuByIdSpy)
  return {
    sut,
    removeSkuSpy,
    loadSkuByIdSpy
  }
}

describe('RemoveSku Controller', () => {
  test('Should return 403 if RemoveSku returns null', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    loadSkuByIdSpy.skuModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This value is not found!')))
  })

  test('Should call RemoveSku with correct values', async () => {
    const { sut, removeSkuSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeSkuSpy.id).toEqual(httpRequest.params.skuId)
  })

  test('Should return 500 if RemoveSku throws', async () => {
    const { sut, removeSkuSpy } = makeSut()
    jest.spyOn(removeSkuSpy, 'removeById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
