import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('categorys')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  keywords: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  fatherCategoryId: number

  @Column()
  globalCategoryId: number

  @Column()
  showInStoreFront: boolean

  @Column()
  isActive: boolean

  @Column()
  activeStoreFrontLink: boolean

  @Column()
  showBrandFilter: boolean

  @Column()
  score: number

  @Column()
  stockKeepingUnitSelectionMode: string
}
