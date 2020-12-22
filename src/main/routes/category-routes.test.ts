import app from '@/main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import faker from 'faker'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Category } from '@/infra/db/typeorm/entities/category'
import { CategoryModel } from '@/domain/models/category/category'
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
      email: faker.internet.email(),
      password: '123',
      accessToken: accessToken,
      role: 'admin'
    })
    await accountsRepository.save(fakeUser)
    return sign(fakeUser.id, env.jwtSecret)
  }

  const makeCategoryCreated = async (): Promise<CategoryModel> => {
    const categorysRepository = getRepository(Category)
    const fakeCategory = categorysRepository.create({
      id: '9ad3f00e-f37a-4338-9ef5-3d76f84367cd',
      name: 'Home Appliances',
      keywords: 'Kitchen, Laundry, Appliances',
      title: 'Home Appliances',
      description: 'Discover our range of home appliances. Find smart vacuums, kitchen and laundry appliances to suit your needs. Order online now.',
      fatherCategoryId: 2,
      globalCategoryId: 222,
      showInStoreFront: true,
      isActive: true,
      activeStoreFrontLink: true,
      showBrandFilter: true,
      score: 3,
      stockKeepingUnitSelectionMode: 'SPECIFICATION'
    })
    await categorysRepository.save(fakeCategory)
    fakeCategory.name += 'updated'
    return fakeCategory
  }

  describe('POST /categorys', () => {
    test('Should return 403 on add category without accessToken', async () => {
      await request(app)
        .post('/api/categorys')
        .send({
          name: faker.name.findName(),
          keywords: faker.random.word(),
          title: faker.random.word(),
          description: faker.random.word(),
          fatherCategoryId: faker.random.number(),
          globalCategoryId: faker.random.number(),
          showInStoreFront: faker.random.boolean(),
          isActive: faker.random.boolean(),
          activeStoreFrontLink: faker.random.boolean(),
          showBrandFilter: faker.random.boolean(),
          score: faker.random.number(),
          stockKeepingUnitSelectionMode: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 204 on add categorys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/categorys')
        .set('x-access-token', accessToken)
        .send({
          name: 'Home Appliances',
          keywords: 'Kitchen, Laundry, Appliances',
          title: 'Home Appliances',
          description: 'Discover our range of home appliances. Find smart vacuums, kitchen and laundry appliances to suit your needs. Order online now.',
          fatherCategoryId: 2,
          globalCategoryId: 222,
          showInStoreFront: true,
          isActive: true,
          activeStoreFrontLink: true,
          showBrandFilter: true,
          score: 3,
          stockKeepingUnitSelectionMode: 'SPECIFICATION'
        })
        .expect(204)
    })
  })

  describe('PUT /categorys', () => {
    test('Should return 403 on add category without accessToken', async () => {
      await request(app)
        .put('/api/categorys')
        .send({
          id: faker.random.uuid(),
          name: faker.name.findName(),
          keywords: faker.random.word(),
          title: faker.random.word(),
          description: faker.random.word(),
          fatherCategoryId: faker.random.number(),
          globalCategoryId: faker.random.number(),
          showInStoreFront: faker.random.boolean(),
          isActive: faker.random.boolean(),
          activeStoreFrontLink: faker.random.boolean(),
          showBrandFilter: faker.random.boolean(),
          score: faker.random.number(),
          stockKeepingUnitSelectionMode: faker.random.word()
        })
        .expect(403)
    })

    test('Should return 200 on update category with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const category = await makeCategoryCreated()
      await request(app)
        .put('/api/categorys')
        .set('x-access-token', accessToken)
        .send({
          id: category.id,
          name: category.name,
          keywords: category.keywords,
          title: category.title,
          description: category.description,
          fatherCategoryId: category.fatherCategoryId,
          globalCategoryId: category.globalCategoryId,
          showInStoreFront: category.showInStoreFront,
          isActive: category.isActive,
          activeStoreFrontLink: category.activeStoreFrontLink,
          showBrandFilter: category.showBrandFilter,
          score: category.score,
          stockKeepingUnitSelectionMode: category.stockKeepingUnitSelectionMode
        })
        .expect(200)
    })
  })
})
