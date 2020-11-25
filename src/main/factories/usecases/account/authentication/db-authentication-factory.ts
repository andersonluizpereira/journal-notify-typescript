import env from '../../../../config/env'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptografy/jwt-adapter/jwt-adapter'
import { Authentication } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { AccountsRepository } from '@/infra/db/typeorm/repositories/accountsRepository'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountsRepository = new AccountsRepository()
  return new DbAuthentication(accountsRepository, bcryptAdapter, jwtAdapter, accountsRepository)
}
