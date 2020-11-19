import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddConstraintReceitaCategorias1605791545165
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'receitas',
      new TableForeignKey({
        name: 'ReceitaCategoria',
        columnNames: ['id_categoria'],
        referencedColumnNames: ['id_categoria'],
        referencedTableName: 'categorias',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('receitas', 'ReceitaCategoria');
  }
}
