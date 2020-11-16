import { Express } from 'express'
import { bodyParse, cors, contentType } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
