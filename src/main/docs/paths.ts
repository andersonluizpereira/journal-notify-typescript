import {
  loginPath,
  signUpPath,
  brandPath,
  brandResultPath,
  categoryResultPath,
  categoryPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/brands/{brandId}': brandResultPath,
  '/brands': brandPath,
  '/categorys/{categoryId}': categoryResultPath,
  '/categorys': categoryPath
}
