/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/promise-function-async */
import Redis from 'ioredis'
import { RedisAdapter } from './redisAdapter'

jest.mock('ioredis')

const makeSut = () => {
  const clientStub = new Redis()

  const sut = new RedisAdapter(clientStub)

  return { sut, clientStub }
}

describe('RedisAdapter Test', () => {
  describe('clear()', () => {
    test('should call RedisClient del with correct value', async () => {
      const { sut, clientStub } = makeSut()

      const clearSpy = jest.spyOn(clientStub, 'del')

      await sut.clear('anykey')

      expect(clearSpy).toHaveBeenCalledWith('anykey')
    })

    test('should throw if RedisClient del throws', async () => {
      const { sut, clientStub } = makeSut()

      jest
        .spyOn(clientStub, 'del')
        .mockReturnValueOnce(Promise.reject(new Error()))

      await expect(sut.clear('anykey')).rejects.toThrow()
    })
  })

  describe('save()', () => {
    test('should call RedisClient set with correct values', async () => {
      const { sut, clientStub } = makeSut()

      const setSpy = jest.spyOn(clientStub, 'set')

      const data = { id: 1, value: 'anyvalue' }

      await sut.save('anykey', data)

      expect(setSpy).toHaveBeenCalledWith('anykey', JSON.stringify(data))
    })

    test('should throw if RedisClient set throws', async () => {
      const { sut, clientStub } = makeSut()

      jest
        .spyOn(clientStub, 'set')
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .mockImplementationOnce(() => Promise.reject(new Error()))

      const data = { id: 1, value: 'anyvalue' }

      await expect(sut.save('anykey', data)).rejects.toThrow()
    })
  })

  describe('load()', () => {
    test('should call RedisClient get with correct value', async () => {
      const { sut, clientStub } = makeSut()

      const getSpy = jest.spyOn(clientStub, 'get')

      await sut.load('anykey')

      expect(getSpy).toHaveBeenCalledWith('anykey')
    })

    test('should throw if RedisClient get throws', async () => {
      const { sut, clientStub } = makeSut()

      jest
        .spyOn(clientStub, 'get')
        .mockReturnValueOnce(Promise.reject(new Error()))

      await expect(sut.load('anykey')).rejects.toThrow()
    })

    test('should return null if RedisClient returns null', async () => {
      const { sut, clientStub } = makeSut()

      jest.spyOn(clientStub, 'get').mockReturnValueOnce(Promise.resolve(null))

      const response = await sut.load('anykey')

      expect(response).toBeNull()
    })

    test('should return parsed object on success', async () => {
      const { sut, clientStub } = makeSut()

      const data = { value: 'anycontent' }

      jest
        .spyOn(clientStub, 'get')
        .mockReturnValueOnce(Promise.resolve(JSON.stringify(data)))

      const response = await sut.load('anykey')

      expect(response).toEqual(data)
    })
  })
})
