import models from '../../database/models/init-models.js';
import { Op } from 'sequelize';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class GamesRepository {
  static games = models.games;

  static findAllGames = withErrorHandling(async (limit = 100) => {
    return this.games.findAll({ limit });
  });

  static findGameById = withErrorHandling(async (gameId) => {
    return this.games.findOne({
      where: {
        id: gameId,
      },
    });
  });

  static findGamesByName = withErrorHandling(async (gameName) => {
    return this.games.findAll({
      where: {
        name: {
          [Op.like]: `%${gameName}%`,
        },
      },
    });
  });

  static findAllGamesName = withErrorHandling(async () => {
    const allGames = await this.games.findAll({ attributes: ['id', 'name'] });
    return allGames.map((game) => game.name);
  });
}
