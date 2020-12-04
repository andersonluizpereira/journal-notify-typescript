import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { JwtAdapter } from '@/infra/criptografy/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { AccountsRepository } from '@/infra/db/typeorm/repositories/account/accountsRepository'
export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountsRepository = new AccountsRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountsRepository)
}
