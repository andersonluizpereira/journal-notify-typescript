import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  stack: string

  @Column()
  dateCreated?: Date
}
