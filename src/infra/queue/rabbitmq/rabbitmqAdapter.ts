import { rabbitmqParams, rabbitmqQueue } from '@/data/protocols/queue/rabbitmq/rabbitmq'
import amqplib from 'amqplib'

export class RabbitmqAdapter implements rabbitmqQueue {
  constructor (private readonly serverProperties: string) {}
  async publishToQueue ({ queueName, body }: rabbitmqParams): Promise<Boolean> {
    const connection = await amqplib.connect(this.serverProperties || 'amqp://usuario:senha@0.0.0.0:5672/vhost')
    const channel = await connection.createChannel()
    const queueChannel = await channel.sendToQueue(queueName, Buffer.from(body))
    await channel.close()
    return queueChannel
  }
}
