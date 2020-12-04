import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'
import { LogsRepository } from '@/infra/db/typeorm/repositories/log/log-repository'
export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogsRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
