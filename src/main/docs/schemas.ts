import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addBrandParamsSchema,
  updateBrandParamsSchema,
  brandResultSchema,
  addCategoryParamsSchema,
  updateCategoryParamsSchema,
  categoryResultSchema,
  addProductParamsSchema,
  updateProductParamsSchema,
  productResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addBrandParams: addBrandParamsSchema,
  updateBrandParams: updateBrandParamsSchema,
  brands: brandResultSchema,
  brandResult: brandResultSchema,
  addCategoryParams: addCategoryParamsSchema,
  updateCategoryParams: updateCategoryParamsSchema,
  categorys: categoryResultSchema,
  categoryResult: categoryResultSchema,
  addProductParams: addProductParamsSchema,
  updateProductParams: updateProductParamsSchema,
  products: productResultSchema,
  productResult: productResultSchema,
  error: errorSchema
}
