/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddBrandController } from '../factories/controllers/brand/add-brand/add-brand-controller-factory'
import { makeLoadBrandsController } from '../factories/controllers/brand/load-brands/load-brands-controller-factory'
import { makeUpdateBrandController } from '../factories/controllers/brand/update-brand/update-brand-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.get('/brands', adminAuth, adaptRoute(makeLoadBrandsController()))
  router.post('/brands', adminAuth, adaptRoute(makeAddBrandController()))
  router.put('/brands', adminAuth, adaptRoute(makeUpdateBrandController()))
}
