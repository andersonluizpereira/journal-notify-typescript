import app from '@/main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import faker from 'faker'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Product } from '@/infra/db/typeorm/entities/product'
import { ProductModel } from '@/domain/models/product/product'
let connection: Connection

describe('Products Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM products')
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM products')
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

  const makeProductCreated = async (): Promise<ProductModel> => {
    const productsRepository = getRepository(Product)
    const fakeProduct = productsRepository.create({
      id: 'b0309f48-d7eb-423b-b8d0-2425c444af6f',
      name: 'insert product test',
      departmentId: '4abb89a3-1b42-46ef-8054-442e92879856',
      categoryId: '4abb89a3-1b42-46ef-8054-442e92879856',
      brandId: 'a7e7d6fe-5b17-4060-8305-65395ca99c23',
      linkId: 'insert-product-test',
      refId: '310117869',
      isVisible: true,
      description: 'texto de descrição',
      descriptionShort: 'Utilize o CEP 04548-005 para frete grátis',
      releaseDate: '2019-01-01T00:00:00',
      keyWords: 'teste,teste2',
      title: 'product de teste',
      isActive: true,
      taxCode: 56,
      metaTagDescription: 'tag test',
      supplierId: 1,
      showWithoutStock: true,
      score: 1
    })
    await productsRepository.save(fakeProduct)
    fakeProduct.name += 'updated'
    return fakeProduct
  }

  describe('POST /products', () => {
    test('Should return 403 on add product without accessToken', async () => {
      await request(app)
        .post('/api/products')
        .send({
          name: faker.name.findName(),
          departmentId: faker.random.uuid(),
          categoryId: faker.random.uuid(),
          brandId: faker.random.uuid(),
          linkId: faker.random.word(),
          refId: faker.random.word(),
          isVisible: faker.random.boolean(),
          description: faker.random.word(),
          descriptionShort: faker.random.word(),
          releaseDate: new Date(),
          keyWords: faker.random.word(),
          title: faker.random.word(),
          isActive: faker.random.boolean(),
          taxCode: faker.random.number(),
          metaTagDescription: faker.random.word(),
          supplierId: faker.random.number(),
          showWithoutStock: faker.random.boolean(),
          score: faker.random.number()
        })
        .expect(403)
    })

    test('Should return 200 on add products with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/products')
        .set('x-access-token', accessToken)
        .send({
          name: 'insert product test',
          departmentId: '4abb89a3-1b42-46ef-8054-442e92879856',
          categoryId: '4abb89a3-1b42-46ef-8054-442e92879856',
          brandId: 'a7e7d6fe-5b17-4060-8305-65395ca99c23',
          linkId: 'insert-product-test',
          refId: '310117869',
          isVisible: true,
          description: 'texto de descrição',
          descriptionShort: 'Utilize o CEP 04548-005 para frete grátis',
          releaseDate: '2019-01-01T00:00:00',
          keyWords: 'teste,teste2',
          title: 'product de teste',
          isActive: true,
          taxCode: 56,
          metaTagDescription: 'tag test',
          supplierId: 1,
          showWithoutStock: true,
          score: 1
        })
        .expect(200)
    })
  })

  describe('PUT /products', () => {
    test('Should return 403 on add product without accessToken', async () => {
      await request(app)
        .put('/api/products')
        .send({
          id: faker.random.uuid(),
          name: faker.name.findName(),
          departmentId: faker.random.uuid(),
          categoryId: faker.random.uuid(),
          brandId: faker.random.uuid(),
          linkId: faker.random.word(),
          refId: faker.random.word(),
          isVisible: faker.random.boolean(),
          description: faker.random.word(),
          descriptionShort: faker.random.word(),
          releaseDate: new Date(),
          keyWords: faker.random.word(),
          title: faker.random.word(),
          isActive: faker.random.boolean(),
          taxCode: faker.random.number(),
          metaTagDescription: faker.random.word(),
          supplierId: faker.random.number(),
          showWithoutStock: faker.random.boolean(),
          score: faker.random.number()
        })
        .expect(403)
    })

    test('Should return 200 on update product with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const product = await makeProductCreated()
      await request(app)
        .put('/api/products')
        .set('x-access-token', accessToken)
        .send({
          id: product.id,
          name: product.name,
          departmentId: product.departmentId,
          categoryId: product.categoryId,
          brandId: product.brandId,
          linkId: product.linkId,
          refId: product.refId,
          isVisible: product.isVisible,
          description: product.description,
          descriptionShort: product.descriptionShort,
          releaseDate: product.releaseDate,
          keyWords: product.keyWords,
          title: product.title,
          isActive: product.isActive,
          taxCode: product.taxCode,
          metaTagDescription: product.metaTagDescription,
          supplierId: product.supplierId,
          showWithoutStock: product.showWithoutStock,
          score: product.score
        })
        .expect(200)
    })
  })
})
