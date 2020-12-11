import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '@/data/usecases'
import { AccountsRepository } from '@/infra/db/typeorm/repositories/account/accountsRepository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountsRepository = new AccountsRepository()
  return new DbAddAccount(bcryptAdapter, accountsRepository, accountsRepository)
}
