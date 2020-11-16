import env from '../../../../config/env'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptografy/jwt-adapter/jwt-adapter'
import { Authentication } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
