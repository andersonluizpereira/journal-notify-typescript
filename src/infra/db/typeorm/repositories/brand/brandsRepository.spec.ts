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
    await connection.query('DELETE FROM logs')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM logs')

    await connection.close()
  })

  describe('add()', () => {
    test('Should add a brand on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddBrandParams())
      expect(sut).toBeTruthy()
    })
  })
})
