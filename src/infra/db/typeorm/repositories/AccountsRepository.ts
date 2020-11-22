import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { getRepository, Repository } from 'typeorm'
import { Account } from '../entities/Account'

export class AccountsRepository
implements AddAccountRepository, LoadAccountByEmailRepository {
  private readonly accountsRepository: Repository<Account>

  constructor () {
    this.accountsRepository = getRepository(Account)
  }

  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = this.accountsRepository.create(data)
    await this.accountsRepository.save(account)
    const accountModel = (): AccountModel => ({
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password
    })
    return accountModel()
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const account = await this.accountsRepository.findOne({
      where: {
        email
      }
    })
    if (account) {
      const accountModel = (): AccountModel => ({
        id: account.id,
        name: account.name,
        email: account.email,
        password: account.password
      })
      return accountModel()
    }
    return null
  }
}
