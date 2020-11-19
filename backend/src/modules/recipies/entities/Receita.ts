import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Usuario from '../../users/entities/User';

import Categoria from '../../categories/entities/Categoria';

@Entity('receitas')
class Receita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_receita: string;

  @Column()
  id_categoria: string;

  @Column()
  tempo_preparo_min: number;

  @Column()
  porcoes: number;

  @Column()
  modo_preparo: string;

  @Column()
  ingredientes: string;

  @ManyToOne(() => Categoria, categoria => categoria.receitas)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column()
  id_usuario: string;

  @ManyToOne(() => Usuario, usuario => usuario.receitas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Receita;
