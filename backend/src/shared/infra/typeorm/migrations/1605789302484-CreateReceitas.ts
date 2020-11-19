import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateReceitas1605789302484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'receitas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome_receita',
            type: 'varchar',
          },
          {
            name: 'id_categoria',
            type: 'uuid',
          },
          {
            name: 'tempo_preparo_min',
            type: 'integer',
          },
          {
            name: 'porcoes',
            type: 'integer',
          },
          {
            name: 'modo_preparo',
            type: 'text',
          },
          {
            name: 'ingredientes',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('receitas');
  }
}
