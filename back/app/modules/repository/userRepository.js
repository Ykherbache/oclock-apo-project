import { Sequelize, Op } from 'sequelize';
import models from '../../database/models/init-models.js';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class UserRepository {
  static users = models.users;
  static findUserById = withErrorHandling(async (userId) => {
    return await this.users.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude: ['password', 'isLoggedIn'] },
    });
  });

  static updateUserById = withErrorHandling(async (userId, updates) => {
    let user = await this.findUserById(userId);
    if (user) {
      user = Object.assign(user, updates);
      await user.save();
    }
    return user;
  });

  static getAllPseudos = withErrorHandling(async () => {
    const users = await this.users.findAll({
      attributes: ['pseudo'],
    });
    return users.map((user) => user.pseudo);
  });

  static getAllCities = withErrorHandling(async () => {
    const users = await this.users.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      where: {
        city: {
          [Op.ne]: null,
        },
      },
    });
    return users.map((user) => user.city);
  });
}
