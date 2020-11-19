import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Receita from '../../recipies/entities/Receita';

@Entity('usuarios')
class User {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column()
  nome: string;

  @Column()
  login: string;

  @Column()
  senha?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Receita, receita => receita.usuario)
  receitas: Receita[];
}

export default User;
