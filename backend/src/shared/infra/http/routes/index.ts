import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import receitasRouter from './receitas.routes';
import usersRouter from './users.routes';
import categoriesRouter from './categories.routes';

const routes = Router();

routes.use('/receitas', receitasRouter);
routes.use('/usuarios', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categorias', categoriesRouter);

export default routes;
