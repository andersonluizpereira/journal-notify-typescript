import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Createlogs1601689010416 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'logs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'stack',
            type: 'varchar'
          },
          {
            name: 'dateCreated',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('logs')
  }
}
