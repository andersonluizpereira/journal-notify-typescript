
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParamsModel = (): any => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  role: faker.random.words(),
  accessToken: faker.random.uuid(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
