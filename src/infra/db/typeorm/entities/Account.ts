import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  accessToken?: string

  @Column()
  role: string
}
