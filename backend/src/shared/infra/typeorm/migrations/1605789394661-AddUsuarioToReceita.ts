import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUsuarioToReceita1605789394661
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM receitas`);

    await queryRunner.addColumn(
      'receitas',
      new TableColumn({
        name: 'id_usuario',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'receitas',
      new TableForeignKey({
        name: 'ReceitaUsuario',
        columnNames: ['id_usuario'],
        referencedColumnNames: ['id_usuario'],
        referencedTableName: 'usuarios',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('receitas', 'ReceitaUsuario');
    await queryRunner.dropColumn('receitas', 'id_usuario');
  }
}
