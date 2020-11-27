import app from '@/main/config/app'
import request from 'supertest'
import { Connection, getRepository } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'
import { Account } from '@/infra/db/typeorm/entities/account'
import { hash } from 'bcrypt'

let connection: Connection

describe('Login Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM accounts')
    await connection.close()
  })

  // describe('POST /signup', () => {
  // test.only('should not be able to authenticate with invalid credentials', async () => {
  //   await request(app).post('/api/signup').send({
  //     email: 'andy2903.alp@gmail.com',
  //     password: '12345678c@'
  //   }).expect(401)
  // })
  // test('Should return 200 on signup', async () => {
  //   await request(app)
  //     .post('/api/signup')
  //     .send({
  //       name: 'Anderson Pereira',
  //       email: 'andy2903.alp@gmail.com',
  //       password: '123',
  //       passwordConfirmation: '123'
  //     })
  //     .expect(200)
  //   await request(app)
  //     .post('/api/signup')
  //     .send({
  //       name: 'Anderson Pereira',
  //       email: 'andy2903.alp@gmail.com',
  //       password: '123',
  //       passwordConfirmation: '123'
  //     })
  //     .expect(403)
  // })
  // })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const salt = 12
      const password = await hash('123', 12)
      const hashedPassword = await hash(password, salt)
      const accountsRepository = getRepository(Account)
      const fakeUser = accountsRepository.create({
        name: 'Anderson',
        email: 'andy2903.alp@gmail.com',
        password: hashedPassword,
        accessToken: hashedPassword,
        role: 'user'
      })

      await accountsRepository.save(fakeUser)
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'andy2903.alp@gmail.com',
          password: '123'
        })
      expect(response.status).toBe(404)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'andy2903.alp@gmail.com',
          password: '123'
        })
        .expect(404)
    })
  })
})
