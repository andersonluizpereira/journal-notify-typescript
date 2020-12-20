import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addBrandParamsSchema,
  updateBrandParamsSchema,
  brandResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addBrandParams: addBrandParamsSchema,
  updateBrandParams: updateBrandParamsSchema,
  brands: brandResultSchema,
  brandResult: brandResultSchema,
  error: errorSchema
}
