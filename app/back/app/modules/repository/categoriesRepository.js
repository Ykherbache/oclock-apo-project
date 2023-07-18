import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class CategoriesRepository {
  static categories = models.categories;
  static findAll = withErrorHandling(async () => {
    return this.categories.findAll({
      limit: 200,
    });
  });
  static findById = withErrorHandling(async (id) => {
    return this.categories.findByPk(id, {
      attributes: ['id', 'name'],
    });
  });
  static findByName = withErrorHandling(async (name) => {
    return this.categories.findOne({
      where: {
        name,
      },
    });
  });
}
