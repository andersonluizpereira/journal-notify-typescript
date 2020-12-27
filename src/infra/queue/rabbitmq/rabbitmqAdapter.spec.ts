/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { rabbitmqParams } from '@/data/protocols/queue/rabbitmq/rabbitmq'
import { RabbitmqAdapter } from './rabbitmqAdapter'

const makeSut = () => {
  const sut = new RabbitmqAdapter('')
  return { sut }
}

const mockQueueParams = (): rabbitmqParams => ({
  queueName: 'any_queue',
  body: 'any_body'
})

describe('RabbitmqAdapter Test', () => {
  it('should call amqplib sendMessage with correct values', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'publishToQueue')
    const queueName = await sut.publishToQueue(mockQueueParams())
    expect(queueName).toBe(true)
  })
  it('should call amqplib sendMessage with error values', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'publishToQueue').mockReturnValue(Promise.reject(new Error()))
    await expect(sut.publishToQueue(mockQueueParams())).rejects.toThrow()
  })
})
