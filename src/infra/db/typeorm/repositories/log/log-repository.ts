import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { getRepository, Repository } from 'typeorm'
import { Log } from '../../entities/log'

export class LogsRepository
implements LogErrorRepository {
  private readonly logsRepository: Repository<Log>

  constructor () {
    this.logsRepository = getRepository(Log)
  }

  async logError (stack: string): Promise<void> {
    console.log('stack ', stack)
    const log = this.logsRepository.create({
      stack: stack
    })
    await this.logsRepository.save(log)
  }
}
