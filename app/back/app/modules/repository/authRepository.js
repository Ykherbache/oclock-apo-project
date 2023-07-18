import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class AuthRepository {
  static users = models.users;
  static createUser = withErrorHandling(async (data) => {
    return this.users.create(data);
  });

  static findUserByEmail = withErrorHandling(async (email) => {
    return await this.users.findOne({ where: { email } });
  });

  static updateUserById = withErrorHandling(async (id, data) => {
    await this.users.update(data, { where: { id } });
    return await this.users.findByPk(id);
  });
}
