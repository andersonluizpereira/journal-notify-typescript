import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { mockPutRequest, mockGetRequest, mockPostRequest } from '@/data/test'
import { mockAxiosDelete, mockAxiosGet, mockAxiosPost, mockAxiosPut } from '@/infra/test'
import { mockDeleteRequest } from '@/data/test/mock-http-delete'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxiosPut: jest.Mocked<typeof axios>
  mockedAxiosGet: jest.Mocked<typeof axios>
  mockedAxiosPost: jest.Mocked<typeof axios>
  mockedAxiosDelete: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxiosPut = mockAxiosPut()
  const mockedAxiosGet = mockAxiosGet()
  const mockedAxiosPost = mockAxiosPost()
  const mockedAxiosDelete = mockAxiosDelete()
  return {
    sut,
    mockedAxiosPut,
    mockedAxiosGet,
    mockedAxiosPost,
    mockedAxiosDelete
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct put values', async () => {
    const request = mockPutRequest()
    const { sut, mockedAxiosPut } = makeSut()
    await sut.put(request)
    expect(mockedAxiosPut.put).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body put values', () => {
    const { sut, mockedAxiosPut } = makeSut()
    const promise = sut.put(mockPutRequest())
    expect(promise).toEqual(mockedAxiosPut.put.mock.results[0].value)
  })

  test('Should call axios with correct get values', async () => {
    const request = mockGetRequest()
    const { sut, mockedAxiosGet } = makeSut()
    await sut.get(request)
    expect(mockedAxiosGet.get).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body get values', () => {
    const { sut, mockedAxiosGet } = makeSut()
    const promise = sut.get(mockGetRequest())
    expect(promise).toEqual(mockedAxiosGet.get.mock.results[0].value)
  })

  test('Should call axios with correct post values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxiosPost } = makeSut()
    await sut.post(request)
    expect(mockedAxiosPost.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body post values', () => {
    const { sut, mockedAxiosPost } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxiosPost.post.mock.results[0].value)
  })

  test('Should call axios with correct delete values', async () => {
    const request = mockDeleteRequest()
    const { sut, mockedAxiosDelete } = makeSut()
    await sut.delete(request)
    expect(mockedAxiosDelete.delete).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body delete values', () => {
    const { sut, mockedAxiosDelete } = makeSut()
    const promise = sut.delete(mockDeleteRequest())
    expect(promise).toEqual(mockedAxiosDelete.delete.mock.results[0].value)
  })
})
