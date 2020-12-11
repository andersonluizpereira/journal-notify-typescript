import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  addBrandParamsSchema,
  brandResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addBrandParams: addBrandParamsSchema,
  brandResult: brandResultSchema,
  error: errorSchema
}
