import { EntityRepository, Repository } from 'typeorm';

import Receita from '../entities/Receita';

@EntityRepository(Receita)
class ReceitasRepository extends Repository<Receita> {}

export default ReceitasRepository;
