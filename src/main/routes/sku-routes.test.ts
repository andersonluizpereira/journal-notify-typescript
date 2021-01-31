import app from '@/main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import faker from 'faker'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let connection: Connection

describe('Skus Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM skus')
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM skus')
    await connection.query('DELETE FROM accounts')
    await connection.close()
  })

  const makeAccessToken = async (): Promise<string> => {
    const accessToken = await hash('123', 12)
    const accountsRepository = getRepository(Account)
    const fakeUser = accountsRepository.create({
      name: 'Anderson',
      email: faker.internet.email(),
      password: '123',
      accessToken: accessToken,
      role: 'admin'
    })
    await accountsRepository.save(fakeUser)
    return sign(fakeUser.id, env.jwtSecret)
  }

  describe('POST /skus', () => {
    test('Should return 403 on add sku without accessToken', async () => {
      await request(app)
        .post('/api/skus')
        .send({
          productId: faker.random.uuid(),
          isActive: faker.random.boolean(),
          name: faker.random.word(),
          refId: faker.random.word(),
          packagedHeight: faker.random.number(),
          packagedLength: faker.random.number(),
          packagedWidth: faker.random.number(),
          packagedWeightKg: faker.random.number(),
          height: faker.random.number(),
          length: faker.random.number(),
          width: faker.random.number(),
          weightKg: faker.random.number(),
          cubicWeight: faker.random.number(),
          isKit: faker.random.boolean(),
          rewardValue: faker.random.number(),
          manufacturerCode: faker.random.number(),
          commercialConditionId: faker.random.number(),
          measurementUnit: faker.random.word(),
          unitMultiplier: faker.random.number(),
          kitItensSellApart: faker.random.boolean()
        })
        .expect(403)
    })

    test('Should return 200 on add skus with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/skus')
        .set('x-access-token', accessToken)
        .send({
          productId: 'b0309f48-d7eb-423b-b8d0-2425c444af6f',
          isActive: true,
          name: 'sku test',
          refId: '310117869',
          packagedHeight: 10,
          packagedLength: 10,
          packagedWidth: 10,
          packagedWeightKg: 10,
          height: 1,
          length: 1,
          width: 1,
          weightKg: 1,
          cubicWeight: 1,
          isKit: true,
          rewardValue: 1,
          manufacturerCode: '123',
          commercialConditionId: 1,
          measurementUnit: 'un',
          unitMultiplier: 1,
          kitItensSellApart: true
        })
        .expect(200)
    })
  })

  describe('PUT /skus', () => {
    test('Should return 403 on add sku without accessToken', async () => {
      await request(app)
        .put('/api/skus')
        .send({
          id: '38387503-0984-46fb-ada5-c82d48cf7016',
          productId: 'b0309f48-d7eb-423b-b8d0-2425c444af6f',
          isActive: true,
          name: 'sku test',
          refId: '310117869',
          packagedHeight: 10,
          packagedLength: 10,
          packagedWidth: 10,
          packagedWeightKg: 10,
          height: 1,
          length: 1,
          width: 1,
          weightKg: 1,
          cubicWeight: 1,
          isKit: true,
          rewardValue: 1,
          manufacturerCode: '123',
          commercialConditionId: 1,
          measurementUnit: 'un',
          unitMultiplier: 1,
          kitItensSellApart: true
        })
        .expect(403)
    })

    test('Should return 200 on update sku with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      // const sku = await makeSkuCreated()
      await request(app)
        .put('/api/skus')
        .set('x-access-token', accessToken)
        .send({
          id: 'cfdb7154-32a2-42b5-aa94-efa76a1d554c',
          productId: 'b0309f48-d7eb-423b-b8d0-2425c444af6f',
          isActive: true,
          name: 'sku test updated',
          refId: '310117869',
          packagedHeight: 10,
          packagedLength: 10,
          packagedWidth: 10,
          packagedWeightKg: 10,
          height: 1,
          length: 1,
          width: 1,
          weightKg: 1,
          cubicWeight: 1,
          isKit: true,
          rewardValue: 1,
          manufacturerCode: '123',
          commercialConditionId: 1,
          measurementUnit: 'un',
          unitMultiplier: 1,
          kitItensSellApart: true
        })
        .expect(200)
    })
  })
})
