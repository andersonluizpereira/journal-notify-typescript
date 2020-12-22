import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { Category } from '@/infra/db/typeorm/entities/category'
import { mockCategoryModel } from '@/domain/test/mock-category/mock-category'

let connection: Connection

describe('Categorys Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM categorys')
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM categorys')
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

  const makeCreatedCategory = async (): Promise<Category> => {
    const categorysRepository = getRepository(Category)
    const categoryModel = await mockCategoryModel()
    const data = await categorysRepository.create(categoryModel)
    await categorysRepository.save(data)
    const category = await connection.query('select * FROM categorys')
    return category[0]
  }

  describe('GET /categorys/:categoryId', () => {
    test('Should return 403 on load category result without accessToken', async () => {
      await request(app)
        .get('/api/categorys/any_id')
        .expect(403)
    })
    test('Should return 200 on load category result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const category = await makeCreatedCategory()
      await request(app)
        .get(`/api/categorys/${category.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('Delete /categorys/:categoryId', () => {
    test('Should return 403 on remove category result without accessToken', async () => {
      await request(app)
        .delete('/api/categorys/any_id')
        .expect(403)
    })
    test('Should return 204 on remove category result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const category = await makeCreatedCategory()
      await request(app)
        .delete(`/api/categorys/${category.id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
