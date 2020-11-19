import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import ReceitasRepository from '../../../../../modules/recipies/repositories/ReceitasRepository';
import CreateReceitaService from '../../../../../modules/recipies/services/CreateReceitaService';
import DeleteReceitaService from '../../../../../modules/recipies/services/DeleteReceitaService';

export default class ReceitasController {
  async store(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const {
      nome_receita,
      tempo_preparo_min,
      porcoes,
      modo_preparo,
      ingredientes,
      id_categoria,
    } = req.body;

    const createReceita = new CreateReceitaService();

    const receita = await createReceita.execute({
      id_usuario: id,
      nome_receita,
      tempo_preparo_min,
      porcoes,
      modo_preparo,
      ingredientes,
      id_categoria,
    });

    return res.json(receita);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { sort, direction, page, pageSize } = req.query;

    let take = 6;
    let skip = 0;
    let order: object = {
      created_at: 'DESC',
    };

    if (sort && direction) {
      order = {
        [sort as string]: direction,
      };
    }

    if (page && pageSize) {
      take = parseInt(pageSize as string, 10);
      skip = take * (parseInt(page as string, 10) - 1);

      if (skip < 0) skip = 0;
    }

    const receitaRepository = getCustomRepository(ReceitasRepository);

    const [receitas, total] = await receitaRepository.findAndCount({
      where: { id_usuario: id },
      order,
      take,
      skip,
    });

    return res.json({
      receitas,
      pageCount: Math.ceil(total / take),
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id: id_usuario } = req.user;
    const { id } = req.params;

    const deleteReceita = new DeleteReceitaService();

    await deleteReceita.execute({ id_usuario, id });

    return res.status(204).send();
  }
}
