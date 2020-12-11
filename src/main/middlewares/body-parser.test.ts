import request from 'supertest'
import app from '../config/app'
import { Connection } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'

let connection: Connection

describe('Body Parser Middleware', () => {
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
  test('Should parse body as json ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Anderson' })
      .expect({ name: 'Anderson' })
  })
})
