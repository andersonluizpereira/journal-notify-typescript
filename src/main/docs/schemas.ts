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
  categoryResultSchema
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
  error: errorSchema
}
