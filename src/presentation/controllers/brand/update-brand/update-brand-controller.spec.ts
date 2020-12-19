
import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadBrandsByIdSpy, UpdateBrandSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { UpdateBrandController } from './update-brand-controller'
import { HttpRequest } from './update-brand-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.random.uuid(),
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
      sut: UpdateBrandController
      validationSpy: ValidationSpy
      loadBrandByIdSpy: LoadBrandsByIdSpy
      updateBrandSpy: UpdateBrandSpy
    }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadBrandByIdSpy = new LoadBrandsByIdSpy()
  const updateBrandSpy = new UpdateBrandSpy()
  const sut = new UpdateBrandController(updateBrandSpy, loadBrandByIdSpy, validationSpy)
  return {
    sut,
    validationSpy,
    loadBrandByIdSpy,
    updateBrandSpy
  }
}

describe('UpdateBrand Controller', () => {
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

  test('Should return 403 if UpdateBrand returns null', async () => {
    const { sut, loadBrandByIdSpy } = makeSut()
    loadBrandByIdSpy.brandModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This brand is not found!')))
  })

  test('Should call UpdateBrand with correct values', async () => {
    const { sut, updateBrandSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(updateBrandSpy.brandModel).toEqual(httpRequest.body)
  })

  test('Should return 500 if UpdateBrand throws', async () => {
    const { sut, updateBrandSpy } = makeSut()
    jest.spyOn(updateBrandSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
