import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { Brand } from '@/infra/db/typeorm/entities/brand'
import { mockBrandModel } from '@/domain/test/mock-brand/mock-brand'

let connection: Connection

describe('Brands Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM brands')
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM brands')
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

  const makeCreatedBrand = async (): Promise<Brand> => {
    const brandsRepository = getRepository(Brand)
    const brandModel = await mockBrandModel()
    const data = await brandsRepository.create(brandModel)
    await brandsRepository.save(data)
    const brand = await connection.query('select * FROM brands')
    return brand[0]
  }

  describe('GET /brands/:brandId/results', () => {
    test('Should return 403 on load brand result without accessToken', async () => {
      await request(app)
        .get('/api/brands/any_id/results')
        .expect(403)
    })
    test('Should return 200 on load brand result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const brand = await makeCreatedBrand()
      await request(app)
        .get(`/api/brands/${brand.id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('Delete /brands/:brandId/remove', () => {
    test('Should return 403 on remove brand result without accessToken', async () => {
      await request(app)
        .delete('/api/brands/any_id/remove')
        .expect(403)
    })
    test('Should return 204 on remove brand result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const brand = await makeCreatedBrand()
      await request(app)
        .delete(`/api/brands/${brand.id}/remove`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
