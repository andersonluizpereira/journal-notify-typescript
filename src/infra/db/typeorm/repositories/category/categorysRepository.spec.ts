/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createConnection from '../../connection'
import { Connection } from 'typeorm'
import { CategorysRepository } from './categorysRepository'
import { mockAddCategoryParams } from '@/domain/test/mock-category/mock-category'
let connection: Connection
const makeSut = (): CategorysRepository => {
  return new CategorysRepository()
}

describe('CategorysRepository', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM categorys')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM categorys')

    await connection.close()
  })

  describe('add()', () => {
    test('Should add a category on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      expect(sut).toBeTruthy()
    })
  })

  describe('removeById()', () => {
    test('Should remove a category on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      const categorysData = await connection.query('select * FROM categorys')
      const category = await sut.loadById(categorysData[0].id)
      await sut.removeById(category.id)
      expect(sut).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all categorys on success', async () => {
      const sut = makeSut()
      const addCategorysModels1 = mockAddCategoryParams()
      const addCategorysModels2 = mockAddCategoryParams()
      await sut.add(addCategorysModels1)
      await sut.add(addCategorysModels2)
      const category = await sut.loadAll()
      expect(category.length).toBe(2)
      expect(category[0].id).toBeTruthy()
      expect(category[0].name).toBe(addCategorysModels1.name)
      expect(category[0].isActive).toBe(addCategorysModels1.isActive)
      expect(category[1].name).toBe(addCategorysModels2.name)
      expect(category[1].isActive).toBe(addCategorysModels2.isActive)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const categorys = await sut.loadAll()
      expect(categorys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load category by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      const categoryData = await connection.query('select * FROM categorys')
      const category = await sut.loadById(categoryData[0].id)
      expect(sut).toBeTruthy()
      expect(category.id).toBeTruthy()
    })
  })
  describe('update()', () => {
    test('Should remove category by id on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCategoryParams())
      const categorysData = await connection.query('select * FROM categorys')
      var category = await sut.loadById(categorysData[0].id)
      category.name += 'updated'
      const categoryNameOlder = category.name
      const categoryData = await sut.update(category)
      expect(sut).toBeTruthy()
      expect(categoryData.id).toBeTruthy()
      expect(categoryData.name).toBe(categoryNameOlder)
    })
  })
})
