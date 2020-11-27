import { mockAddAccountParamsModel } from '@/domain/test'
import { Connection, getRepository } from 'typeorm'
import createConnection from '../connection'
import faker from 'faker'
import { AccountsRepository } from './accountsRepository'
import { Account } from '../entities/account'

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
    test('should be able to insert a new account', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParamsModel()
      const account = await sut.add(addAccountParams)

      expect(account).toBeTruthy()
      expect(account).toHaveProperty('id')
      expect(account.id).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    test('should return null when email does not exists', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail(faker.internet.email())

      expect(account).toBeNull()
    })

    test('should return an user by email', async () => {
      const sut = makeSut()

      const accountRepository = getRepository(Account)
      const addAccountParams = mockAddAccountParamsModel()
      const fakeUser = accountRepository.create(addAccountParams)

      await accountRepository.save(fakeUser)

      const account = await sut.loadByEmail(addAccountParams.email)

      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.email).toBe(addAccountParams.email)
    })

    describe('updateAccessToken()', () => {
      test('Should update the account accessToken on success', async () => {
        const sut = makeSut()
        const addAccountParams = mockAddAccountParamsModel()
        const account = await sut.add(addAccountParams)
        const fakeAccount = await sut.loadByEmail(account.email)
        const accessToken = faker.random.uuid()
        await sut.updateAccessToken(fakeAccount.id, accessToken)
        const accountModel = await sut.loadByEmail(fakeAccount.email)
        expect(accountModel).toBeTruthy()
        expect(accountModel.accessToken).toBe(accessToken)
      })
    })
  })
  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.random.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.random.uuid()
    })

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await sut.add({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await sut.add({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })
  })
})
