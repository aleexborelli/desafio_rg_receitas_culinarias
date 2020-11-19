import { getRepository } from 'typeorm';
import ConfirmActionError from '../../../shared/errors/ConfirmActionError';

import Categoria from '../entities/Categoria';
import Receita from '../../recipies/entities/Receita';
import AppError from '../../../shared/errors/AppError';

interface Request {
  id_categoria: string;
  isConfirmed: boolean;
}

class DeleteCategoriaService {
  async execute({ id_categoria, isConfirmed }: Request): Promise<boolean> {
    const receitaRepository = getRepository(Receita);
    const categoriaRepository = getRepository(Categoria);

    const categoria = await categoriaRepository.findOne({
      where: {
        id: id_categoria,
      },
    });

    if (!categoria) {
      throw new AppError('Categoria não encontrada');
    }

    const [receitas, count] = await receitaRepository.findAndCount({
      where: {
        id_categoria,
      },
    });

    if (count > 0) {
      if (!isConfirmed)
        throw new ConfirmActionError(
          'Tem certeza que deseja executar essa operação? Todas as receitas vinculadas à esta categoria serão apagadas!',
        );

      await receitaRepository.remove(receitas);
    }

    await categoriaRepository.remove(categoria);

    return true;
  }
}

export default DeleteCategoriaService;
