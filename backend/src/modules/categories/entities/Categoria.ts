import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Receita from '../../recipies/entities/Receita';

@Entity('categorias')
class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id_categoria: string;

  @Column()
  nome_categoria: string;

  @OneToMany(() => Receita, receita => receita.categoria)
  receitas: Receita[];
}

export default Categoria;
