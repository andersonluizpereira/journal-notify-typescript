import axios from 'axios'
import faker from 'faker'

export const mockAxiosPut = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.put.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number()
  })
  return mockedAxios
}

export const mockAxiosGet = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.get.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number()
  })
  return mockedAxios
}

export const mockAxiosPost = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number()
  })
  return mockedAxios
}

export const mockAxiosDelete = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.delete.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number()
  })
  return mockedAxios
}
