import app from '@/main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import faker from 'faker'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Brand } from '@/infra/db/typeorm/entities/brand'
import { BrandModel } from '@/domain/models/brand/brand'
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
      email: faker.internet.email(),
      password: '123',
      accessToken: accessToken,
      role: 'admin'
    })
    await accountsRepository.save(fakeUser)
    return sign(fakeUser.id, env.jwtSecret)
  }

  const makeBrandCreated = async (): Promise<BrandModel> => {
    const brandsRepository = getRepository(Brand)
    const fakeBrand = brandsRepository.create({
      name: faker.name.findName(),
      title: faker.random.word(),
      description: faker.random.word(),
      keywords: faker.random.word(),
      isActive: faker.random.boolean(),
      adWordsRemarketingCode: faker.random.word(),
      lomadeeCampaignCode: faker.random.word(),
      score: faker.random.number(),
      linkId: faker.random.word()
    })
    await brandsRepository.save(fakeBrand)
    fakeBrand.name += 'updated'
    return fakeBrand
  }

  describe('POST /brands', () => {
    test('Should return 403 on add brand without accessToken', async () => {
      await request(app)
        .post('/api/brands')
        .send({
          name: faker.name.findName(),
          title: faker.random.word(),
          description: faker.random.word(),
          keywords: faker.random.word(),
          isActive: faker.random.boolean(),
          adWordsRemarketingCode: faker.random.word(),
          lomadeeCampaignCode: faker.random.word(),
          score: faker.random.number(),
          linkId: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 204 on add brand with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/brands')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.findName(),
          title: faker.random.word(),
          description: faker.random.word(),
          keywords: faker.random.word(),
          isActive: faker.random.boolean(),
          adWordsRemarketingCode: faker.random.word(),
          lomadeeCampaignCode: faker.random.word(),
          score: faker.random.number(),
          linkId: faker.random.word()
        })
        .expect(204)
    })
  })

  describe('PUT /brands', () => {
    test('Should return 403 on add brand without accessToken', async () => {
      await request(app)
        .put('/api/brands/update')
        .send({
          id: faker.random.uuid(),
          name: faker.name.findName(),
          title: faker.random.word(),
          description: faker.random.word(),
          keywords: faker.random.word(),
          isActive: faker.random.boolean(),
          adWordsRemarketingCode: faker.random.word(),
          lomadeeCampaignCode: faker.random.word(),
          score: faker.random.number(),
          linkId: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 200 on update brand with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const brand = await makeBrandCreated()
      await request(app)
        .put('/api/brands/update')
        .set('x-access-token', accessToken)
        .send({
          id: brand.id,
          name: brand.name,
          title: brand.title,
          description: brand.description,
          keywords: brand.keywords,
          isActive: brand.isActive,
          adWordsRemarketingCode: brand.adWordsRemarketingCode,
          lomadeeCampaignCode: brand.lomadeeCampaignCode,
          score: brand.score,
          linkId: brand.linkId
        })
        .expect(200)
    })
  })
})
