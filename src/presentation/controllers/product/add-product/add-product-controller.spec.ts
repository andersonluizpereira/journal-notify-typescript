import { throwError } from '@/data/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { AddProductSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { AddProductController } from './add-product-controller'
import { HttpRequest } from './add-product-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
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
    sut: AddProductController
    validationSpy: ValidationSpy
    addProductSpy: AddProductSpy
  }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProductSpy = new AddProductSpy()
  const sut = new AddProductController(validationSpy, addProductSpy)
  return {
    sut,
    validationSpy,
    addProductSpy
  }
}

describe('AddProduct Controller', () => {
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

  test('Should call AddProduct with correct values', async () => {
    const { sut, addProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addProductSpy.addProductParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductSpy } = makeSut()
    jest.spyOn(addProductSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, addProductSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addProductSpy.productModel))
  })
})
