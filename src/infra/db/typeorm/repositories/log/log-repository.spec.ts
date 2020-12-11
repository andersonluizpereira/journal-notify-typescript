/* eslint-disable @typescript-eslint/explicit-function-return-type */
import createConnection from '../../connection'
import { Connection } from 'typeorm'
import { LogsRepository } from './log-repository'
import { mockAddLogParamsModel } from '@/domain/test/mock-account/mock-log'
let connection: Connection

const makeSut = () => {
  return new LogsRepository()
}

describe('LogsRepository Test', () => {
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

  describe('create()', () => {
    test('should be able to insert a new log', async () => {
      const sut = makeSut()
      const addLogParams = mockAddLogParamsModel()
      await sut.logError(addLogParams)
      expect(sut).toBeTruthy()
    })
  })
})
