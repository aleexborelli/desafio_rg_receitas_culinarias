import { Router } from 'express';

import ReceitasController from '../controllers/recipies/ReceitasController';

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.get('/', receitasController.index);
receitasRouter.post('/', receitasController.store);
receitasRouter.delete('/:id', receitasController.delete);

export default receitasRouter;
