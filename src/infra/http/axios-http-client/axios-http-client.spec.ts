import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import axios from 'axios'
import { mockPutRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPutRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.put(request)
    expect(mockedAxios.put).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.put(mockPutRequest())
    expect(promise).toEqual(mockedAxios.put.mock.results[0].value)
  })
})
