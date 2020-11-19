import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import ReceitasRepository from '../repositories/ReceitasRepository';

import Receita from '../entities/Receita';
import Categoria from '../../categories/entities/Categoria';

interface Request {
  id_usuario: string;
  id_categoria: string;
  nome_receita: string;
  tempo_preparo_min: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
}
class CreateReceitaService {
  public async execute({
    id_usuario,
    id_categoria,
    nome_receita,
    tempo_preparo_min,
    porcoes,
    modo_preparo,
    ingredientes,
  }: Request): Promise<Receita> {
    const categoriaRepository = getRepository(Categoria);
    const receitaRepository = getCustomRepository(ReceitasRepository);

    const categoria = await categoriaRepository.findOne(id_categoria);

    if (!categoria) throw new AppError('Categoria Inválida');

    const receita = receitaRepository.create({
      id_usuario,
      id_categoria,
      nome_receita,
      tempo_preparo_min,
      porcoes,
      modo_preparo,
      ingredientes,
    });

    await receitaRepository.save(receita);

    return receita;
  }
}

export default CreateReceitaService;
