import express from 'express'
import setupMiddlewares from './middlewares'
import setupStaticFiles from './static-files'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
