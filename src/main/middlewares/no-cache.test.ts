import app from '@/main/config/app'
import { noCache } from './no-cache'
import request from 'supertest'
import { Connection } from 'typeorm'
import createConnection from '@/infra/db/typeorm/connection'

let connection: Connection

describe('NoCache Middleware', () => {
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
  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
