import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptografy/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '@/data/usecases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
