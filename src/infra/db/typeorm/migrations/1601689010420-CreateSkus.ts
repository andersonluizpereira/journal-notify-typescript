import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Createskus1601689010420 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'skus',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'productId',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'refId',
            type: 'varchar'
          },
          {
            name: 'packagedHeight',
            type: 'numeric'
          },
          {
            name: 'packagedLength',
            type: 'numeric'
          },
          {
            name: 'packagedWidth',
            type: 'numeric'
          },
          {
            name: 'packagedWeightKg',
            type: 'numeric'
          },
          {
            name: 'height',
            type: 'numeric'
          },
          {
            name: 'length',
            type: 'numeric'
          },
          {
            name: 'width',
            type: 'numeric'
          },
          {
            name: 'weightKg',
            type: 'numeric'
          },
          {
            name: 'cubicWeight',
            type: 'numeric'
          },
          {
            name: 'isKit',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'rewardValue',
            type: 'numeric'
          },
          {
            name: 'manufacturerCode',
            type: 'numeric'
          },
          {
            name: 'commercialConditionId',
            type: 'numeric'
          },
          {
            name: 'measurementUnit',
            type: 'varchar'
          },
          {
            name: 'unitMultiplier',
            type: 'numeric'
          },
          {
            name: 'kitItensSellApart',
            type: 'boolean',
            default: 'false'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('skus')
  }
}
