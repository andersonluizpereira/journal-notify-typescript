import { HttpParams } from '@/domain/models/http/http-params'
import faker from 'faker'

export const mockPutRequest = (): HttpParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
