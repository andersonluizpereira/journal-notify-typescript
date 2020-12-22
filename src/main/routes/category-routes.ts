/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddCategoryController } from '../factories/controllers/category/add-category/add-category-controller-factory'
import { makeLoadCategorysController } from '../factories/controllers/category/load-categorys/load-categorys-controller-factory'
import { makeUpdateCategoryController } from '../factories/controllers/category/update-category/update-category-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.get('/categorys', adminAuth, adaptRoute(makeLoadCategorysController()))
  router.post('/categorys', adminAuth, adaptRoute(makeAddCategoryController()))
  router.put('/categorys', adminAuth, adaptRoute(makeUpdateCategoryController()))
}
