import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Usuario from '../../../../../modules/users/entities/User';

import CreateUserService from '../../../../../modules/users/services/CreateUserService';
import AppError from '../../../../errors/AppError';

export default class UsersController {
  async store(req: Request, res: Response): Promise<Response> {
    const { nome, login, senha } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      nome,
      login,
      senha,
    });

    return res.json(user);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const usersRepository = getRepository(Usuario);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError('Usuario Inválido');

    delete user.senha;

    return res.json(user);
  }
}
