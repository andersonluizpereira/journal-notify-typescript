import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Createbrands1601689010417 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'brands',
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
            name: 'title',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'keywords',
            type: 'varchar'
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: 'false',
            isNullable: true
          },
          {
            name: 'adWordsRemarketingCode',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'lomadeeCampaignCode',
            type: 'varchar',
            length: '200'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('brands')
  }
}
