/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createConnection from '../../connection'
import { Connection } from 'typeorm'
import { ProductsRepository } from './productsRepository'
import { mockAddProductParams } from '@/domain/test/mock-product/mock-product'
let connection: Connection
const makeSut = (): ProductsRepository => {
  return new ProductsRepository()
}

describe('ProductsRepository', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM products')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM products')

    await connection.close()
  })

  describe('add()', () => {
    test('Should add a product on success', async () => {
      const sut = makeSut()
      const product = await sut.add(mockAddProductParams())
      expect(product).toBeTruthy()
      expect(product).toHaveProperty('id')
      expect(product.id).toBeTruthy()
    })
  })

  describe('removeById()', () => {
    test('Should remove a product on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProductParams())
      const productsData = await connection.query('select * FROM products')
      const product = await sut.loadById(productsData[0].id)
      await sut.removeById(product.id)
      expect(sut).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all products on success', async () => {
      const sut = makeSut()
      const addProductsModels1 = mockAddProductParams()
      const addProductsModels2 = mockAddProductParams()
      await sut.add(addProductsModels1)
      await sut.add(addProductsModels2)
      const product = await sut.loadAll()
      expect(product.length).toBe(2)
      expect(product[0].id).toBeTruthy()
      expect(product[0].name).toBe(addProductsModels1.name)
      expect(product[0].isActive).toBe(addProductsModels1.isActive)
      expect(product[1].name).toBe(addProductsModels2.name)
      expect(product[1].isActive).toBe(addProductsModels2.isActive)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const products = await sut.loadAll()
      expect(products.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load product by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProductParams())
      const productData = await connection.query('select * FROM products')
      const product = await sut.loadById(productData[0].id)
      expect(sut).toBeTruthy()
      expect(product.id).toBeTruthy()
    })
  })

  describe('loadByRefId()', () => {
    test('Should load product by refId on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProductParams())
      const productData = await connection.query('select * FROM products')
      const product = await sut.loadByRefId(productData[0].refId)
      expect(sut).toBeTruthy()
      expect(product.refId).toBeTruthy()
    })
  })
  describe('update()', () => {
    test('Should remove product by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProductParams())
      const productsData = await connection.query('select * FROM products')
      var product = await sut.loadById(productsData[0].id)
      product.name += 'updated'
      const productNameOlder = product.name
      const productData = await sut.update(product)
      expect(sut).toBeTruthy()
      expect(productData.id).toBeTruthy()
      expect(productData.name).toBe(productNameOlder)
    })
  })
})
