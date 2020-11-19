import { Request, Response } from 'express';

import AuthUserService from '../../../../../modules/users/services/AuthUserService';

export default class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { login, senha } = req.body;

    const authUserService = new AuthUserService();

    const { usuario, token } = await authUserService.execute({ login, senha });

    return res.json({ usuario, token });
  }
}
