import { CategoriesService } from '../services/categoriesService.js';

export class CategoriesController {
  static getAllCategories = async (req, res) => {
    try {
      const categoriesRes = await CategoriesService.getAllCategories();
      res.status(200).json(categoriesRes);
    } catch (error) {
      console.error('Error retrieving categories :', error);
      res.status(500).json({ error: 'Error retrieving categories' });
    }
  };
}
