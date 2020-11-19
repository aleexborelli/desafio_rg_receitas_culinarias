import { Router } from 'express';

import CategoriesController from '../controllers/categories/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/:id', categoriesController.show);
categoriesRouter.post('/', categoriesController.store);

export default categoriesRouter;
