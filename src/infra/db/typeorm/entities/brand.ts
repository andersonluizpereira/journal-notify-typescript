import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  keywords: string

  @Column()
  isActive?: boolean

  @Column()
  adWordsRemarketingCode: string

  @Column()
  lomadeeCampaignCode: string
}
