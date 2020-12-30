import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  departmentId: string

  @Column()
  categoryId: string

  @Column()
  brandId: string

  @Column()
  linkId: string

  @Column()
  refId: string

  @Column()
  isVisible: boolean

  @Column()
  description: string

  @Column()
  descriptionShort: string

  @Column()
  releaseDate: Date

  @Column()
  keyWords: string

  @Column()
  title: string

  @Column()
  isActive: boolean

  @Column()
  taxCode: number

  @Column()
  metaTagDescription: string

  @Column()
  supplierId: number

  @Column()
  showWithoutStock: boolean

  @Column()
  score: number
}
