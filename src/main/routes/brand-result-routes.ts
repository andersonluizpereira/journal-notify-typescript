import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoadBrandResultBrandsController } from '../factories/controllers/brand/load-brand-result/load-brand-result-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/brands/:brandId/results', adminAuth, adaptRoute(makeLoadBrandResultBrandsController()))
}
