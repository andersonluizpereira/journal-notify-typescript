import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Createproductss1601689010419 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'departmentId',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'categoryId',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'brandId',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'linkId',
            type: 'varchar'
          },
          {
            name: 'refId',
            type: 'varchar'
          },
          {
            name: 'isVisible',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'descriptionShort',
            type: 'varchar'
          },
          {
            name: 'releaseDate',
            type: 'timestamp',
            default: 'now()',
            isNullable: true
          },
          {
            name: 'keyWords',
            type: 'varchar'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'taxCode',
            type: 'int'
          },
          {
            name: 'metaTagDescription',
            type: 'varchar'
          },
          {
            name: 'supplierId',
            type: 'int'
          },
          {
            name: 'showWithoutStock',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'score',
            type: 'int'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
