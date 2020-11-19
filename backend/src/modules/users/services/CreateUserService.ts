import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Usuario from '../entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
  nome: string;
  login: string;
  senha: string;
}

class CreateUserService {
  public async execute({ nome, login, senha }: Request): Promise<Usuario> {
    const usuariosRepository = getRepository(Usuario);

    const checkIfUserExists = await usuariosRepository.findOne({
      where: { login },
    });

    if (checkIfUserExists) {
      throw new AppError('Login já existente');
    }

    const hashedPassword = await hash(senha, 8);

    const usuario = usuariosRepository.create({
      nome,
      login,
      senha: hashedPassword,
    });

    await usuariosRepository.save(usuario);

    delete usuario.senha;

    return usuario;
  }
}

export default CreateUserService;
