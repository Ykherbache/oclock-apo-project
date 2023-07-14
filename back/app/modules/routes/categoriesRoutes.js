import { Router } from 'express';
import { CategoriesController } from '../controllers/categoriesController.js';

const router = Router();

router.get('/categories', CategoriesController.getAllCategories);

export default router;
