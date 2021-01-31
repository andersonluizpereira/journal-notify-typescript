import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { Sku } from '@/infra/db/typeorm/entities/sku'
import { mockSkuModel } from '@/domain/test/mock-sku/mock-sku'

let connection: Connection

describe('Sku Routes', () => {
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
      email: 'andy2903.alp@gmail.com',
      password: '123',
      accessToken: accessToken,
      role: 'admin'
    })
    await accountsRepository.save(fakeUser)
    return sign(fakeUser.id, env.jwtSecret)
  }

  const makeCreatedSku = async (): Promise<Sku> => {
    const skusRepository = getRepository(Sku)
    const skuModel = await mockSkuModel()
    const data = await skusRepository.create(skuModel)
    await skusRepository.save(data)
    const sku = await connection.query('select * FROM skus')
    return sku[0]
  }

  describe('GET /skus/:skuId', () => {
    test('Should return 403 on load sku result without accessToken', async () => {
      await request(app)
        .get('/api/skus/any_id')
        .expect(403)
    })
    test('Should return 200 on load sku result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const sku = await makeCreatedSku()
      await request(app)
        .get(`/api/skus/${sku.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET /skus/:refId/ean', () => {
    test('Should return 403 on load sku result without accessToken', async () => {
      await request(app)
        .get('/api/skus/any_id/ean')
        .expect(403)
    })
    test('Should return 200 on load sku result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const sku = await makeCreatedSku()
      await request(app)
        .get(`/api/skus/${sku.refId}/ean`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
  describe('Delete /skus/:skuId', () => {
    test('Should return 403 on remove sku result without accessToken', async () => {
      await request(app)
        .delete('/api/skus/any_id')
        .expect(403)
    })
    test('Should return 204 on remove sku result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const sku = await makeCreatedSku()
      await request(app)
        .delete(`/api/skus/${sku.id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
