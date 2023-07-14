import models from '../../database/models/init-models.js';

export class RentRepository {
  static rents = models.rents;
  static async findOne(game_id, status) {
    return await this.rents.findOne({
      where: {
        user_game_id: game_id,
        status,
      },
    });
  }

  static async findOneById(id) {
    return await this.rents.findOne({
      where: { id },
    });
  }

  static async findOneByIdAndOwnerId(id, userIdOwner) {
    return await this.rents.findOne({
      where: {
        id,
        user_id_owner: userIdOwner,
      },
    });
  }
  static async findOneByIdAndRenterId(id, userIdRenter) {
    return await this.rents.findOne({
      where: {
        id,
        user_id_renter: userIdRenter,
      },
    });
  }
  static async findAndCountAllByOwner(userId, page, limit, status) {
    return await this.rents.findAndCountAll({
      where: { user_id_owner: userId, status },
      limit,
      offset: (page - 1) * limit,
    });
  }

  static async findAndCountAllByRenter(userId, page, limit, status) {
    return await this.rents.findAndCountAll({
      where: { user_id_renter: userId, status },
      limit,
      offset: (page - 1) * limit,
    });
  }
  static async create(rentData) {
    return this.rents.create(rentData);
  }

  static async updateStatus(id, status) {
    return await this.rents.update({ status }, { where: { id } });
  }

  static async deleteById(id) {
    return await this.rents.destroy({
      where: { id },
    });
  }
}
