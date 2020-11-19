import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';

import Categoria from '../../../../../modules/categories/entities/Categoria';
import CreateCategoriaService from '../../../../../modules/categories/services/CreateCategoryService';
import AppError from '../../../../errors/AppError';

export default class CategoriasController {
  async index(req: Request, res: Response): Promise<Response> {
    const categoriasRepository = getRepository(Categoria);

    const categorias = await categoriasRepository.find();

    return res.json(categorias);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const categoriasRepository = getRepository(Categoria);
    const categorias = await categoriasRepository.find();

    if (!categorias) {
      throw new AppError('Categorias não encontradas');
    }

    return res.json(categorias);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { nome_categoria } = req.body;

    const createCategoria = new CreateCategoriaService();

    const categoria = await createCategoria.execute({
      nome_categoria,
    });

    return res.json(categoria);
  }
}
