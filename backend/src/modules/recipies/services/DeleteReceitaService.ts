import { getCustomRepository } from 'typeorm';

import ReceitasRepository from '../repositories/ReceitasRepository';

import AppError from '../../../shared/errors/AppError';

interface Request {
  id_usuario: string;
  id: string;
}

class DeleteReceitaService {
  public async execute({ id_usuario, id }: Request): Promise<void> {
    const receitaRepository = getCustomRepository(ReceitasRepository);

    const receita = await receitaRepository.findOne({
      where: { id, id_usuario },
    });

    if (!receita) throw new AppError('Receita não encontrada');

    await receitaRepository.remove(receita);
  }
}

export default DeleteReceitaService;
