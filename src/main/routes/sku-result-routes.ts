import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoadSkuResultRefByIdController } from '../factories/controllers/sku/load-sku-by-ref-id/load-sku-by-ref-id-controller-factory'
import { makeLoadSkusController } from '../factories/controllers/sku/load-skus/load-skus-controller-factory'
import { makeRemoveSkuController } from '../factories/controllers/sku/remove-sku/remove-sku-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/skus/:skuId', adminAuth, adaptRoute(makeLoadSkusController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/skus/:refId/ean', adminAuth, adaptRoute(makeLoadSkuResultRefByIdController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/skus/:skuId', adminAuth, adaptRoute(makeRemoveSkuController()))
}
