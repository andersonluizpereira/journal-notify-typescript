import {
  loginPath,
  signUpPath,
  brandPath,
  brandResultPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/brands/{brandId}': brandResultPath,
  '/brands': brandPath
}
