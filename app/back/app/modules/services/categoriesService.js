import { CategoriesRepository } from '../repository/categoriesRepository.js';

export class CategoriesService {
  static getAllCategories = async () => {
    return CategoriesRepository.findAll();
  };
}
