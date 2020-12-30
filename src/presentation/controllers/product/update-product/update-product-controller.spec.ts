
import { throwError } from '@/data/test'
import { ValueInNothingUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductsByIdSpy, UpdateProductSpy, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { UpdateProductController } from './update-product-controller'
import { HttpRequest } from './update-product-controller-protocols'

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
      sut: UpdateProductController
      validationSpy: ValidationSpy
      loadProductByIdSpy: LoadProductsByIdSpy
      updateProductSpy: UpdateProductSpy
    }

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadProductByIdSpy = new LoadProductsByIdSpy()
  const updateProductSpy = new UpdateProductSpy()
  const sut = new UpdateProductController(updateProductSpy, loadProductByIdSpy, validationSpy)
  return {
    sut,
    validationSpy,
    loadProductByIdSpy,
    updateProductSpy
  }
}

describe('UpdateProduct Controller', () => {
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

  test('Should return 403 if UpdateProduct returns null', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    loadProductByIdSpy.productModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ValueInNothingUseError('This product is not found!')))
  })

  test('Should call UpdateProduct with correct values', async () => {
    const { sut, updateProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(updateProductSpy.productModel).toEqual(httpRequest.body)
  })

  test('Should return 500 if UpdateProduct throws', async () => {
    const { sut, updateProductSpy } = makeSut()
    jest.spyOn(updateProductSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
