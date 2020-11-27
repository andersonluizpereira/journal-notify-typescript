import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import createConnection from '@/infra/db/typeorm/connection'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  createConnection().then(async () => {
    readdirSync(`${__dirname}/../routes`).map(async file => {
      if (!file.includes('.test.') && !file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(router)
      }
    })
  })
}
