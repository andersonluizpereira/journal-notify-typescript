/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createConnection from '../../connection'
import { Connection } from 'typeorm'
import { SkusRepository } from './skusRepository'
import { mockAddSkuParams } from '@/domain/test/mock-sku/mock-sku'
let connection: Connection
const makeSut = (): SkusRepository => {
  return new SkusRepository()
}

describe('SkusRepository', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM skus')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM skus')

    await connection.close()
  })

  describe('add()', () => {
    test('Should add a sku on success', async () => {
      const sut = makeSut()
      const sku = await sut.add(mockAddSkuParams())
      expect(sku).toBeTruthy()
      expect(sku).toHaveProperty('id')
      expect(sku.id).toBeTruthy()
    })
  })

  describe('removeById()', () => {
    test('Should remove a sku on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSkuParams())
      const skusData = await connection.query('select * FROM skus')
      const sku = await sut.loadById(skusData[0].id)
      await sut.removeById(sku.id)
      expect(sut).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all skus on success', async () => {
      const sut = makeSut()
      const addSkusModels1 = mockAddSkuParams()
      const addSkusModels2 = mockAddSkuParams()
      await sut.add(addSkusModels1)
      await sut.add(addSkusModels2)
      const sku = await sut.loadAll()
      expect(sku.length).toBe(2)
      expect(sku[0].id).toBeTruthy()
      expect(sku[0].name).toBe(addSkusModels1.name)
      expect(sku[0].isActive).toBe(addSkusModels1.isActive)
      expect(sku[1].name).toBe(addSkusModels2.name)
      expect(sku[1].isActive).toBe(addSkusModels2.isActive)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const skus = await sut.loadAll()
      expect(skus.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load sku by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSkuParams())
      const skuData = await connection.query('select * FROM skus')
      const sku = await sut.loadById(skuData[0].id)
      expect(sut).toBeTruthy()
      expect(sku.id).toBeTruthy()
    })
  })

  describe('loadByRefId()', () => {
    test('Should load sku by refId on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSkuParams())
      const skuData = await connection.query('select * FROM skus')
      const sku = await sut.loadByRefId(skuData[0].refId)
      expect(sut).toBeTruthy()
      expect(sku.refId).toBeTruthy()
    })
  })
  describe('update()', () => {
    test('Should remove sku by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSkuParams())
      const skusData = await connection.query('select * FROM skus')
      var sku = await sut.loadById(skusData[0].id)
      sku.name += 'updated'
      const skuNameOlder = sku.name
      const skuData = await sut.update(sku)
      expect(sut).toBeTruthy()
      expect(skuData.id).toBeTruthy()
      expect(skuData.name).toBe(skuNameOlder)
    })
  })
})
