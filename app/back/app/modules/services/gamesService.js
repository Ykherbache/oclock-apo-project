import { GamesRepository } from '../repository/gamesRepository.js';
import { CategoriesRepository } from '../repository/categoriesRepository.js';
import { MechanicsRepository } from '../repository/mechanicsRepository.js';
import { PublishersRepository } from '../repository/publishersRepository.js';

export class GamesService {
  static async getAllGames() {
    return await GamesRepository.findAllGames();
  }
  static async checkGameExist(gameId) {
    return GamesRepository.findGameById(gameId);
  }
  static async getGamesByName(gameName) {
    return await GamesRepository.findGamesByName(gameName);
  }

  static async getGameById(gameId) {
    const game = await GamesRepository.findGameById(gameId);
    const category = game.category_id
      ? await CategoriesRepository.findById(game.category_id)
      : null;

    const mechanic = game.mechanics_type_id
      ? await MechanicsRepository.findById(game.mechanics_type_id)
      : null;

    const publisher = game.publisher_id
      ? await PublishersRepository.findById(game.publisher_id)
      : null;

    return {
      ...game.toJSON(),
      category_name: category ? category.name : null,
      mechanic_name: mechanic ? mechanic.name : null,
      publisher_name: publisher ? publisher.name : null,
    };
  }

  static async getAllGamesName() {
    return GamesRepository.findAllGamesName();
  }
}
