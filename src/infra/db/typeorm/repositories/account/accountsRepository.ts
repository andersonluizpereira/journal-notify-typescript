import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { getRepository, Repository } from 'typeorm'
import { Account } from '@/infra/db/typeorm/entities/account'

export class AccountsRepository
implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository {
  private readonly accountsRepository: Repository<Account>

  constructor () {
    this.accountsRepository = getRepository(Account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const account = await this.accountsRepository.findOne({
      where: {
        id
      }
    })
    await this.accountsRepository.createQueryBuilder().update(account)
      .set({ accessToken: token })
      .where('id = :id', { id: id })
      .execute()
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
        password: account.password,
        accessToken: account.accessToken
      })
      return accountModel()
    }
    return null
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const account = await this.accountsRepository
      .createQueryBuilder().where('accessToken = :accessToken OR role = :role', {
        accessToken: token,
        role: role
      }).getOne()
    return account
  }
}
