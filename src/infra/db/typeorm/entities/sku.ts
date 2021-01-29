import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('skus')
export class Sku {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  productId: string

  @Column()
  isActive: boolean

  @Column()
  name: string

  @Column()
  refId: string

  @Column()
  packagedHeight: number

  @Column()
  packagedLength: number

  @Column()
  packagedWidth: number

  @Column()
  packagedWeightKg: number

  @Column()
  height: number

  @Column()
  length: number

  @Column()
  width: number

  @Column()
  weightKg: number

  @Column()
  cubicWeight: number

  @Column()
  isKit: boolean

  @Column()
  rewardValue: number

  @Column()
  manufacturerCode: number

  @Column()
  commercialConditionId: number

  @Column()
  measurementUnit: string

  @Column()
  unitMultiplier: number

  @Column()
  kitItensSellApart: boolean
}
