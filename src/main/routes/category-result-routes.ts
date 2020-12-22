import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoadCategorysController } from '../factories/controllers/category/load-categorys/load-categorys-controller-factory'
import { makeRemoveCategoryController } from '../factories/controllers/category/remove-category/remove-category-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/categorys/:categoryId', adminAuth, adaptRoute(makeLoadCategorysController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/categorys/:categoryId', adminAuth, adaptRoute(makeRemoveCategoryController()))
}
