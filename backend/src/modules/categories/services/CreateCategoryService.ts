import { getRepository } from 'typeorm';

import Categoria from '../entities/Categoria';

interface Request {
  nome_categoria: string;
}

class CreateCategoriaService {
  public async execute({ nome_categoria }: Request): Promise<Categoria> {
    const categoriaRepository = getRepository(Categoria);

    const categoria = categoriaRepository.create({
      nome_categoria,
    });

    await categoriaRepository.save(categoria);

    return categoria;
  }
}

export default CreateCategoriaService;
