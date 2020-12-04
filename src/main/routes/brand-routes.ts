import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddBrandController } from '../factories/controllers/brand/add-brand/add-brand-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/brands', adminAuth, adaptRoute(makeAddBrandController()))
}
