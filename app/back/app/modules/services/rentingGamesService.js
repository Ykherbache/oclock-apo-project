import { RentingGamesRepository } from '../repository/rentingGamesRepository.js';
import { GamesRepository } from '../repository/gamesRepository.js';

export class RentingGamesService {
  static async addRentingGame(gameData) {
    const game = await GamesRepository.findGameById(gameData.id);
    if (!game) {
      throw new Error('The specified game does not exist.');
    }

    const existingRentingGame = await RentingGamesRepository.findGame(
      game.id,
      gameData.ownerId
    );
    if (existingRentingGame) {
      throw new Error(
        'The specified game is already available for rent or sale.'
      );
    }

    await RentingGamesRepository.addRentingGame(gameData);

    return 'The rental has been successfully added.';
  }

  static async getRentingGamesByUser(params) {
    return RentingGamesRepository.getRentingGamesByUser(params);
  }

  static async listGames(params) {
    return RentingGamesRepository.listGames(params);
  }

  static async getRentingGameById(id) {
    return RentingGamesRepository.getRentingGameById(id);
  }

  static async getBestGameRenting(params) {
    return RentingGamesRepository.getBestGameRenting(params);
  }
}
