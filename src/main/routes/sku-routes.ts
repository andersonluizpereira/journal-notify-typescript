/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddSkuController } from '../factories/controllers/sku/add-sku/add-sku-controller-factory'
import { makeLoadSkusController } from '../factories/controllers/sku/load-skus/load-skus-controller-factory'
import { makeUpdateSkuController } from '../factories/controllers/sku/update-sku/update-sku-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.get('/skus', adminAuth, adaptRoute(makeLoadSkusController()))
  router.post('/skus', adminAuth, adaptRoute(makeAddSkuController()))
  router.put('/skus', adminAuth, adaptRoute(makeUpdateSkuController()))
}
