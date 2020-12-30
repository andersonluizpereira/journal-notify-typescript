import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import { hash } from 'bcrypt'
import { Account } from '@/infra/db/typeorm/entities'
import { Product } from '@/infra/db/typeorm/entities/product'
import { mockProductModel } from '@/domain/test/mock-product/mock-product'

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
      email: 'andy2903.alp@gmail.com',
      password: '123',
      accessToken: accessToken,
      role: 'admin'
    })
    await accountsRepository.save(fakeUser)
    return sign(fakeUser.id, env.jwtSecret)
  }

  const makeCreatedProduct = async (): Promise<Product> => {
    const productsRepository = getRepository(Product)
    const productModel = await mockProductModel()
    const data = await productsRepository.create(productModel)
    await productsRepository.save(data)
    const product = await connection.query('select * FROM products')
    return product[0]
  }

  describe('GET /products/:productId', () => {
    test('Should return 403 on load product result without accessToken', async () => {
      await request(app)
        .get('/api/products/any_id')
        .expect(403)
    })
    test('Should return 200 on load product result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const product = await makeCreatedProduct()
      await request(app)
        .get(`/api/products/${product.id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET /products/:refId/ean', () => {
    test('Should return 403 on load product result without accessToken', async () => {
      await request(app)
        .get('/api/products/any_id/ean')
        .expect(403)
    })
    test('Should return 200 on load product result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const product = await makeCreatedProduct()
      await request(app)
        .get(`/api/products/${product.refId}/ean`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
  describe('Delete /products/:productId', () => {
    test('Should return 403 on remove product result without accessToken', async () => {
      await request(app)
        .delete('/api/products/any_id')
        .expect(403)
    })
    test('Should return 204 on remove product result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const product = await makeCreatedProduct()
      await request(app)
        .delete(`/api/products/${product.id}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
