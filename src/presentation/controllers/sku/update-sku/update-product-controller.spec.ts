
import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSkusByIdSpy, UpdateSkuSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { UpdateSkuController } from './update-sku-controller'
import { HttpRequest } from './update-sku-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    departmentId: faker.random.uuid(),
    categoryId: faker.random.uuid(),
    brandId: faker.random.uuid(),
    linkId: faker.random.word(),
    refId: faker.random.word(),
    isVisible: faker.random.boolean(),
    description: faker.random.word(),
    descriptionShort: faker.random.word(),
    releaseDate: new Date(),
    keyWords: faker.random.word(),
    title: faker.random.word(),
    isActive: faker.random.boolean(),
    taxCode: faker.random.number(),
    metaTagDescription: faker.random.word(),
    supplierId: faker.random.number(),
    showWithoutStock: faker.random.boolean(),
    score: faker.random.number()
  }
})

    type SutTypes = {
      sut: UpdateSkuController
      validationSpy: ValidationSpy
      loadSkuByIdSpy: LoadSkusByIdSpy
      updateSkuSpy: UpdateSkuSpy
    }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadSkuByIdSpy = new LoadSkusByIdSpy()
  const updateSkuSpy = new UpdateSkuSpy()
  const sut = new UpdateSkuController(updateSkuSpy, loadSkuByIdSpy, validationSpy)
  return {
    sut,
    validationSpy,
    loadSkuByIdSpy,
    updateSkuSpy
  }
}

describe('UpdateSku Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 403 if UpdateSku returns null', async () => {
    const { sut, loadSkuByIdSpy } = makeSut()
    loadSkuByIdSpy.skuModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This Sku is not found!')))
  })

  test('Should call UpdateSku with correct values', async () => {
    const { sut, updateSkuSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(updateSkuSpy.skuModel).toEqual(httpRequest.body)
  })

  test('Should return 500 if UpdateSku throws', async () => {
    const { sut, updateSkuSpy } = makeSut()
    jest.spyOn(updateSkuSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
