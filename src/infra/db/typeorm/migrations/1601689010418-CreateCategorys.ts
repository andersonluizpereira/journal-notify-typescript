import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Createcategorys1601689010418 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categorys',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'keywords',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'title',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'fatherCategoryId',
            type: 'int'
          },
          {
            name: 'globalCategoryId',
            type: 'int'
          },
          {
            name: 'showInStoreFront',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'activeStoreFrontLink',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'showBrandFilter',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'score',
            type: 'int'
          },
          {
            name: 'stockKeepingUnitSelectionMode',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categorys')
  }
}
