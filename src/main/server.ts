import env from './config/env'
import 'reflect-metadata'
import createConnection from '@/infra/db/typeorm/connection'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createConnection().then(async () => {
      const app = (await import('./config/app')).default
      app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
  })
  .catch(console.error)
