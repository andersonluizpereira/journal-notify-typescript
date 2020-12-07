import { throwError } from '@/data/test'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { AddBrandSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { AddBrandController } from './add-brand-controller'
import { HttpRequest } from './add-brand-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    title: faker.random.word(),
    description: faker.random.word(),
    keywords: faker.random.word(),
    isActive: faker.random.boolean(),
    adWordsRemarketingCode: faker.random.word(),
    lomadeeCampaignCode: faker.random.word(),
    score: faker.random.number(),
    linkId: faker.random.word()
  }
})

  type SutTypes = {
    sut: AddBrandController
    validationSpy: ValidationSpy
    addBrandSpy: AddBrandSpy
  }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addBrandSpy = new AddBrandSpy()
  const sut = new AddBrandController(validationSpy, addBrandSpy)
  return {
    sut,
    validationSpy,
    addBrandSpy
  }
}

describe('AddBrand Controller', () => {
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

  test('Should call AddBrand with correct values', async () => {
    const { sut, addBrandSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addBrandSpy.addBrandParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddBrand throws', async () => {
    const { sut, addBrandSpy } = makeSut()
    jest.spyOn(addBrandSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
