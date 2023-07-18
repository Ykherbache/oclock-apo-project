import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class PublishersRepository {
  static publishers = models.publishers;

  static findById = withErrorHandling(async (id) => {
    return this.publishers.findByPk(id, {
      attributes: ['id', 'name'],
    });
  });
}
