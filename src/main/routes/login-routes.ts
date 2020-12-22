/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeSignUpController } from '../factories/controllers/login/sigup/signup-controller-factory'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
