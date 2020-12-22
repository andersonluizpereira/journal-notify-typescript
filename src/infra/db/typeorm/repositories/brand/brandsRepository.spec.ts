/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createConnection from '../../connection'
import { Connection } from 'typeorm'
import { BrandsRepository } from './brandsRepository'
import { mockAddBrandParams } from '@/domain/test'
let connection: Connection
const makeSut = (): BrandsRepository => {
  return new BrandsRepository()
}

describe('BrandsRepository', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM brands')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM brands')

    await connection.close()
  })

  describe('add()', () => {
    test('Should add a brand on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBrandParams())
      expect(sut).toBeTruthy()
    })
  })

  describe('removeById()', () => {
    test('Should remove a brand on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBrandParams())
      const brandsData = await connection.query('select * FROM brands')
      const brand = await sut.loadById(brandsData[0].id)
      await sut.removeById(brand.id)
      expect(sut).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all brands on success', async () => {
      const sut = makeSut()
      const addBrandsModels1 = mockAddBrandParams()
      const addBrandsModels2 = mockAddBrandParams()
      await sut.add(addBrandsModels1)
      await sut.add(addBrandsModels2)
      const brands = await sut.loadAll()
      expect(brands.length).toBe(2)
      expect(brands[0].id).toBeTruthy()
      expect(brands[0].name).toBe(addBrandsModels1.name)
      expect(brands[0].isActive).toBe(addBrandsModels1.isActive)
      expect(brands[1].name).toBe(addBrandsModels2.name)
      expect(brands[1].isActive).toBe(addBrandsModels2.isActive)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const brands = await sut.loadAll()
      expect(brands.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load brand by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBrandParams())
      const brandData = await connection.query('select * FROM brands')
      const brand = await sut.loadById(brandData[0].id)
      expect(sut).toBeTruthy()
      expect(brand.id).toBeTruthy()
    })
  })
  describe('update()', () => {
    test('Should remove brand by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBrandParams())
      const brandsData = await connection.query('select * FROM brands')
      var brand = await sut.loadById(brandsData[0].id)
      brand.name += 'updated'
      const brandNameOlder = brand.name
      const brandData = await sut.update(brand)
      expect(sut).toBeTruthy()
      expect(brandData.id).toBeTruthy()
      expect(brandData.name).toBe(brandNameOlder)
    })
  })
})
