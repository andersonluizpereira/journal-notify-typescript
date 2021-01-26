import { throwError } from '@/data/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { AddSkuSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { AddSkuController } from './add-sku-controller'
import { HttpRequest } from './add-sku-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    productId: faker.random.uuid(),
    isActive: faker.random.boolean(),
    name: faker.random.word(),
    refId: faker.random.word(),
    packagedHeight: faker.random.number(),
    packagedLength: faker.random.number(),
    packagedWidth: faker.random.number(),
    packagedWeightKg: faker.random.number(),
    height: faker.random.number(),
    length: faker.random.number(),
    width: faker.random.number(),
    weightKg: faker.random.number(),
    cubicWeight: faker.random.number(),
    isKit: faker.random.boolean(),
    rewardValue: faker.random.number(),
    manufacturerCode: faker.random.number(),
    commercialConditionId: faker.random.number(),
    measurementUnit: faker.random.word(),
    unitMultiplier: faker.random.number(),
    kitItensSellApart: faker.random.boolean()
  }
})

  type SutTypes = {
    sut: AddSkuController
    validationSpy: ValidationSpy
    addSkuSpy: AddSkuSpy
  }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addSkuSpy = new AddSkuSpy()
  const sut = new AddSkuController(validationSpy, addSkuSpy)
  return {
    sut,
    validationSpy,
    addSkuSpy
  }
}

describe('AddSku Controller', () => {
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

  test('Should call AddSku with correct values', async () => {
    const { sut, addSkuSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSkuSpy.addSkuParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddSku throws', async () => {
    const { sut, addSkuSpy } = makeSut()
    jest.spyOn(addSkuSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, addSkuSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addSkuSpy.skuModel))
  })
})
