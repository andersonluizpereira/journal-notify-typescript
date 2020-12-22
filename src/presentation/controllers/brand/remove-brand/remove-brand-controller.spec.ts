import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadBrandsByIdSpy, RemoveBrandSpy } from '@/presentation/test'
import faker from 'faker'
import { RemoveBrandController } from './remove-brand-controller'
import { HttpRequest } from './remove-brand-controller-protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    brandId: faker.random.uuid()
  }
})

type SutTypes = {
  sut: RemoveBrandController
  removeBrandSpy: RemoveBrandSpy
  loadBrandByIdSpy: LoadBrandsByIdSpy
}

const makeSut = (): SutTypes => {
  const removeBrandSpy = new RemoveBrandSpy()
  const loadBrandByIdSpy = new LoadBrandsByIdSpy()
  const sut = new RemoveBrandController(removeBrandSpy, loadBrandByIdSpy)
  return {
    sut,
    removeBrandSpy,
    loadBrandByIdSpy
  }
}

describe('RemoveBrand Controller', () => {
  test('Should return 403 if RemoveBrand returns null', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    loadBrandByIdSpy.brandModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This value is not found!')))
  })

  test('Should call RemoveBrand with correct values', async () => {
    const { sut, removeBrandSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(removeBrandSpy.id).toEqual(httpRequest.params.brandId)
  })

  test('Should return 500 if RemoveBrand throws', async () => {
    const { sut, removeBrandSpy } = makeSut()
    jest.spyOn(removeBrandSpy, 'removeById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
