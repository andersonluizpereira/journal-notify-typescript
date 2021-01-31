import {
  loginPath,
  signUpPath,
  brandPath,
  brandResultPath,
  categoryResultPath,
  categoryPath,
  productResultPath,
  productResultRefIdPath,
  productPath,
  skuResultPath,
  skuResultRefIdPath,
  skuPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/brands/{brandId}': brandResultPath,
  '/brands': brandPath,
  '/categorys/{categoryId}': categoryResultPath,
  '/categorys': categoryPath,
  '/products/{productId}': productResultPath,
  '/products/{refId}/ean': productResultRefIdPath,
  '/products': productPath,
  '/skus/{skuId}': skuResultPath,
  '/skus/{refId}/ean': skuResultRefIdPath,
  '/skus': skuPath
}
