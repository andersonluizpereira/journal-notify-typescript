
export type rabbitmqParams = {
  queueName: string
  body: any
}

export interface rabbitmqQueue {
  publishToQueue: (dataQueue: rabbitmqParams) => Promise<Boolean>
}
