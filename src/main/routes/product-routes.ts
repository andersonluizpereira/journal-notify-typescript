/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddProductController } from '../factories/controllers/product/add-product/add-product-controller-factory'
import { makeLoadProductsController } from '../factories/controllers/product/load-products/load-products-controller-factory'
import { makeUpdateProductController } from '../factories/controllers/product/update-product/update-product-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.get('/products', adminAuth, adaptRoute(makeLoadProductsController()))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.put('/products', adminAuth, adaptRoute(makeUpdateProductController()))
}
