import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class MechanicsRepository {
  static mechanics = models.mechanicsType;

  static findAllMechanics = withErrorHandling(async () => {
    return this.mechanics.findAll({ limit: 200 });
  });

  static findById = withErrorHandling(async (id) => {
    return this.mechanics.findByPk(id, {
      attributes: ['id', 'name'],
    });
  });
}
