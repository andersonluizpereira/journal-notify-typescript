import { mockAddAccountParams } from '@/domain/test'
import { Connection, getRepository } from 'typeorm'
import createConnection from '../connection'
import { Account } from '../entities/Account'
import { AccountsRepository } from './AccountsRepository'
import faker from 'faker'

let connection: Connection

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeSut = () => {
  return new AccountsRepository()
}

describe('AccountsRepository Test', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM accounts')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM accounts')

    await connection.close()
  })

  describe('create()', () => {
    it('should be able to insert a new account', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      console.log('addAccountParams', addAccountParams)
      const account = await sut.add(addAccountParams)

      expect(account).toBeTruthy()
      expect(account).toHaveProperty('id')
      expect(account.id).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    it('should return null when email does not exists', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail(faker.internet.email())

      expect(account).toBeNull()
    })

    it('should return an user by email', async () => {
      const sut = makeSut()

      const accountRepository = getRepository(Account)
      const addAccountParams = mockAddAccountParams()
      const fakeUser = accountRepository.create(addAccountParams)

      await accountRepository.save(fakeUser)

      const account = await sut.loadByEmail(addAccountParams.email)

      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.email).toBe(addAccountParams.email)
    })
  })
})
