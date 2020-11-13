import { AuthenticationParams } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
