import { AddProductRepositorySpy, LoadProductsRepositorySpy, throwError, UpdateProductRepositorySpy } from '@/data/test'
import { DbUpdateProduct } from './db-update-product'
import { mockAddProductParams } from '@/domain/test/mock-product/mock-product'

type SutTypes = {
  sut: DbUpdateProduct
  updateProductRepositorySpy: UpdateProductRepositorySpy
  addProductRepositorySpy: AddProductRepositorySpy
  loadProductsRepositorySpy: LoadProductsRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateProductRepositorySpy = new UpdateProductRepositorySpy()
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const loadProductsRepositorySpy = new LoadProductsRepositorySpy()
  const sut = new DbUpdateProduct(updateProductRepositorySpy)
  return {
    sut,
    updateProductRepositorySpy,
    addProductRepositorySpy,
    loadProductsRepositorySpy
  }
}

describe('DbUpdateProduct Usecase', () => {
  test('Should call UpdateProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy, loadProductsRepositorySpy, updateProductRepositorySpy } = makeSut()
    const productData = mockAddProductParams()
    await addProductRepositorySpy.add(productData)
    var productsData = await loadProductsRepositorySpy.loadAll()
    productsData[0].name += 'updated'
    const productsDataName = productsData[0].name
    const product = await sut.update(productsData[0])
    expect(product.name).toEqual(productsDataName)
    expect(updateProductRepositorySpy.productModel).toEqual(product)
  })

  test('Should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositorySpy } = makeSut()
    jest.spyOn(updateProductRepositorySpy, 'update').mockImplementationOnce(throwError)
    const productData = mockAddProductParams()
    const promise = sut.update(productData)
    await expect(promise).rejects.toThrow()
  })
})
