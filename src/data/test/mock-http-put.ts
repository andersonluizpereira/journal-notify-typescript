import { HttpPutParams } from '../protocols/http'
import faker from 'faker'

export const mockPutRequest = (): HttpPutParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
