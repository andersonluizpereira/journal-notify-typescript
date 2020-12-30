import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoadProductResultRefByIdController } from '../factories/controllers/product/load-product-by-ref-id/load-product-by-ref-id-controller-factory'
import { makeLoadProductsController } from '../factories/controllers/product/load-products/load-products-controller-factory'
import { makeRemoveProductController } from '../factories/controllers/product/remove-product/remove-product-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/products/:productId', adminAuth, adaptRoute(makeLoadProductsController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/products/:refId/ean', adminAuth, adaptRoute(makeLoadProductResultRefByIdController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/products/:productId', adminAuth, adaptRoute(makeRemoveProductController()))
}
