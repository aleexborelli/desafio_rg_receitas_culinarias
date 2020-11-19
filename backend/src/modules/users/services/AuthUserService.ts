import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
  login: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ login, senha }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const isPasswordMatch = await compare(senha, user.senha as string);

    if (!isPasswordMatch) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const secret = process.env.AUTH_JWT_SECRET;
    const expiresIn = process.env.AUTH_JWT_EXPIRES_IN;

    const token = sign({}, secret as string, {
      subject: user.id_usuario,
      expiresIn,
    });

    delete user.senha;

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
